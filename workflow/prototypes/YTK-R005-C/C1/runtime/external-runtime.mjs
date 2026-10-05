import {readFileSync} from 'node:fs';
import pg from 'pg';
import {Auth0OidcAdapter,auth0OidcConfigFromEnv,ExternalSupabaseRepository,ExternalBffBoundary,SafeOperationalLogger} from '../dist/index.js';

function required(name){const v=process.env[name];if(!v)throw Error(`missing_env:${name}`);return v}
function dbConfig(){
  const host=required('YTK_DB_HOST');const port=Number(required('YTK_DB_PORT'));if(port!==6543)throw Error('db_port_must_be_6543');
  const database=required('YTK_DB_NAME');const user=required('YTK_DB_USER');const password=required('YTK_DB_PASSWORD');const caPath=required('YTK_DB_CA_CERT_PATH');const ca=readFileSync(caPath,'utf8');if(!ca.includes('BEGIN CERTIFICATE'))throw Error('db_ca_invalid');
  return{host,port,database,user,password,ssl:{ca,rejectUnauthorized:true,servername:host},max:5,application_name:'yattoko-r005c-c2-min'};
}
export function createExternalRuntime({userResolver,logger=new SafeOperationalLogger()}={}){
  if(!userResolver||typeof userResolver.resolve!=='function')throw Error('user_resolver_required');
  const pool=new pg.Pool(dbConfig());
  const auth=new Auth0OidcAdapter(auth0OidcConfigFromEnv(process.env));
  const repository=new ExternalSupabaseRepository(pool);
  const bff=new ExternalBffBoundary(auth,userResolver,repository,logger);
  return{auth,repository,bff,logger,pool,close:()=>pool.end()};
}
