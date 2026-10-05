import type {AssuranceLevel} from './auth.js';

export type QueryResult<T=Record<string,unknown>>={rows:T[];rowCount?:number|null};
export type QueryConfig={text:string;values?:readonly unknown[]};
export interface PgClientLike{query<T=Record<string,unknown>>(query:string|QueryConfig):Promise<QueryResult<T>>;release():void}
export interface PgPoolLike{connect():Promise<PgClientLike>}
export type RuntimeAssurance=Extract<AssuranceLevel,'A1'|'A2'>;
export interface RequestDbContext{userId:string;assurance:RuntimeAssurance}
export interface ExternalStoredRecord{recordId:string;ownerUserId:string;categoryId:string;schemaVersion:1;encryptedPayloadHex:string;createdAt:string;updatedAt:string}
export interface ExternalRecordInsert{recordId:string;categoryId:string;schemaVersion:1;encryptedPayloadHex:string}
export interface ExternalRecordUpdate{categoryId:string;schemaVersion:1;encryptedPayloadHex:string}

function assertUuid(v:string){if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v))throw Error('invalid_uuid')}
function assertCategory(v:string){if(!/^[A-L]$/.test(v))throw Error('invalid_category')}
function assertHex(v:string){if(!/^(?:[0-9a-f]{2})+$/i.test(v))throw Error('invalid_ciphertext_hex')}
function mapRow(r:Record<string,unknown>):ExternalStoredRecord{return{recordId:String(r.record_id),ownerUserId:String(r.owner_user_id),categoryId:String(r.category_id),schemaVersion:1,encryptedPayloadHex:String(r.encrypted_payload_hex),createdAt:String(r.created_at),updatedAt:String(r.updated_at)}}

export class PgRequestTransaction{
  constructor(private pool:PgPoolLike){}
  async run<T>(ctx:RequestDbContext,work:(client:PgClientLike)=>Promise<T>):Promise<T>{
    assertUuid(ctx.userId);if(ctx.assurance!=='A1'&&ctx.assurance!=='A2')throw Error('invalid_assurance');
    const client=await this.pool.connect();let begun=false;
    try{
      await client.query('BEGIN');begun=true;
      await client.query({text:"SELECT set_config('app.current_user_id', $1, true)",values:[ctx.userId]});
      await client.query({text:"SELECT set_config('app.assurance_level', $1, true)",values:[ctx.assurance]});
      const result=await work(client);
      await client.query('COMMIT');begun=false;return result;
    }catch(e){if(begun){try{await client.query('ROLLBACK')}catch{}}throw e}finally{client.release()}
  }
}

export class BoundExternalSupabaseRepository{
  constructor(private client:PgClientLike,private ownerUserId:string){}
  async insert(input:ExternalRecordInsert){
    assertUuid(input.recordId);assertCategory(input.categoryId);assertHex(input.encryptedPayloadHex);if(input.schemaVersion!==1)throw Error('unsupported_schema_version');
    const r=await this.client.query<Record<string,unknown>>({text:`INSERT INTO ytk_private.service_records
      (record_id, owner_user_id, category_id, schema_version, encrypted_payload)
      VALUES ($1, $2, $3, $4, decode($5,'hex'))
      RETURNING record_id, owner_user_id, category_id, schema_version,
                encode(encrypted_payload,'hex') AS encrypted_payload_hex,
                created_at, updated_at`,values:[input.recordId,this.ownerUserId,input.categoryId,1,input.encryptedPayloadHex]});
    if(r.rows.length!==1)throw Error('db_insert_result');return mapRow(r.rows[0]);
  }
  async read(recordId:string){assertUuid(recordId);const r=await this.client.query<Record<string,unknown>>({text:`SELECT record_id, owner_user_id, category_id, schema_version,
      encode(encrypted_payload,'hex') AS encrypted_payload_hex, created_at, updated_at
      FROM ytk_private.service_records
      WHERE record_id = $1 AND owner_user_id = $2`,values:[recordId,this.ownerUserId]});return r.rows[0]?mapRow(r.rows[0]):undefined}
  async update(recordId:string,input:ExternalRecordUpdate){assertUuid(recordId);assertCategory(input.categoryId);assertHex(input.encryptedPayloadHex);if(input.schemaVersion!==1)throw Error('unsupported_schema_version');const r=await this.client.query<Record<string,unknown>>({text:`UPDATE ytk_private.service_records
      SET category_id = $3, schema_version = $4, encrypted_payload = decode($5,'hex'), updated_at = now()
      WHERE record_id = $1 AND owner_user_id = $2
      RETURNING record_id, owner_user_id, category_id, schema_version,
                encode(encrypted_payload,'hex') AS encrypted_payload_hex,
                created_at, updated_at`,values:[recordId,this.ownerUserId,input.categoryId,1,input.encryptedPayloadHex]});return r.rows[0]?mapRow(r.rows[0]):undefined}
  async delete(recordId:string){assertUuid(recordId);const r=await this.client.query({text:'DELETE FROM ytk_private.service_records WHERE record_id = $1 AND owner_user_id = $2',values:[recordId,this.ownerUserId]});return (r.rowCount??0)===1}
}

export class ExternalSupabaseRepository{
  private tx:PgRequestTransaction;
  constructor(pool:PgPoolLike){this.tx=new PgRequestTransaction(pool)}
  async withRequest<T>(ctx:RequestDbContext,work:(repo:BoundExternalSupabaseRepository)=>Promise<T>){return this.tx.run(ctx,client=>work(new BoundExternalSupabaseRepository(client,ctx.userId)))}
}
