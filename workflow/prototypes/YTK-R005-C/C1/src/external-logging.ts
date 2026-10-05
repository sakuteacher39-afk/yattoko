export type ExternalLogEventType='auth_verify'|'db_request';
export type ExternalLogResult='success'|'failure';
export interface ExternalLogInput{eventType:ExternalLogEventType;correlationId:string;result:ExternalLogResult;errorCode?:string;durationMs?:number;assuranceLevel?:'A1'|'A2'}
export class SafeOperationalLogger{
  lines:string[]=[];
  write(input:ExternalLogInput){
    if(!/^[A-Za-z0-9._:-]{1,96}$/.test(input.correlationId))throw Error('invalid_correlation_id');
    if(input.errorCode!==undefined&&!/^[a-z0-9_:-]{1,80}$/i.test(input.errorCode))throw Error('invalid_error_code');
    const line={eventType:input.eventType,correlationId:input.correlationId,result:input.result,...(input.errorCode?{errorCode:input.errorCode}:{}),...(typeof input.durationMs==='number'?{durationMs:Math.max(0,Math.round(input.durationMs))}:{}),...(input.assuranceLevel?{assuranceLevel:input.assuranceLevel}:{}),appVersion:'r005c-c2-min-phase8',schemaVersion:1};
    this.lines.push(JSON.stringify(line));
  }
}
