import type {Auth0OidcAdapter,VerifiedExternalToken} from './external-auth.js';
import type {BoundExternalSupabaseRepository,ExternalSupabaseRepository} from './external-db.js';
import type {SafeOperationalLogger} from './external-logging.js';

export interface InternalUserResolver{resolve(issuer:string,subject:string):Promise<string|undefined>}
export interface ExternalRequestContext{correlationId:string;authorizationHeader:string;nowMs:number}
function bearer(header:string){const m=/^Bearer ([A-Za-z0-9._~-]+)$/.exec(header);if(!m)throw Error('authorization_header');return m[1]}
function code(e:unknown){return e instanceof Error&&/^[a-z0-9_:-]{1,80}$/i.test(e.message)?e.message:'external_request_failed'}
export class ExternalBffBoundary{
  constructor(private auth:Auth0OidcAdapter,private users:InternalUserResolver,private repo:ExternalSupabaseRepository,private logger:SafeOperationalLogger){}
  private async authenticated(ctx:ExternalRequestContext):Promise<{token:VerifiedExternalToken;userId:string}>{
    const started=ctx.nowMs;
    try{
      const token=await this.auth.verifyAccessToken(bearer(ctx.authorizationHeader),ctx.nowMs);
      const userId=await this.users.resolve(token.issuer,token.subject);if(!userId)throw Error('principal_unmapped');
      this.logger.write({eventType:'auth_verify',correlationId:ctx.correlationId,result:'success',durationMs:Date.now()-started,assuranceLevel:token.assurance});
      return{token,userId};
    }catch(e){this.logger.write({eventType:'auth_verify',correlationId:ctx.correlationId,result:'failure',errorCode:code(e),durationMs:Date.now()-started});throw e}
  }
  async withServiceRepository<T>(ctx:ExternalRequestContext,work:(repo:BoundExternalSupabaseRepository)=>Promise<T>):Promise<T>{
    const {token,userId}=await this.authenticated(ctx);if(token.assurance!=='A2')throw Error('a2_required');const started=Date.now();
    try{const result=await this.repo.withRequest({userId,assurance:token.assurance},work);this.logger.write({eventType:'db_request',correlationId:ctx.correlationId,result:'success',durationMs:Date.now()-started,assuranceLevel:token.assurance});return result}catch(e){this.logger.write({eventType:'db_request',correlationId:ctx.correlationId,result:'failure',errorCode:code(e),durationMs:Date.now()-started,assuranceLevel:token.assurance});throw e}
  }
}
