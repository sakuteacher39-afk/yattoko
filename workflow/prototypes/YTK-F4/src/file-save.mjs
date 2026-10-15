import {BackupError,assertRawLimit} from './backup.mjs';
// A successful API return only means the save operation was requested. It never proves physical persistence.
export async function requestFileSave(artifact,environment=globalThis){
let url=null,anchor=null;
try{
assertRawLimit(artifact.bytes.length);
const blob=new environment.Blob([artifact.bytes],{type:'application/json;charset=utf-8'});
if(environment.showSaveFilePicker){
const handle=await environment.showSaveFilePicker({suggestedName:artifact.filename,types:[{description:'ヤットコ JSON',accept:{'application/json':['.json']}}]});
const writable=await handle.createWritable();
try{await writable.write(blob);await writable.close();}catch(e){try{await writable.abort();}catch{}throw e;}
return {status:'requested',method:'picker'};
}
url=environment.URL.createObjectURL(blob);anchor=environment.document.createElement('a');anchor.href=url;anchor.download=artifact.filename;
environment.document.body.append(anchor);anchor.click();
// Keep the URL available briefly for browsers which start reading after click returns.
const savedUrl=url;environment.setTimeout(()=>environment.URL.revokeObjectURL(savedUrl),60_000);url=null;
return {status:'requested',method:'download'};
}catch(e){if(e?.name==='AbortError')return {status:'cancelled'};throw new BackupError('SAVE_REQUEST_FAILED');}
finally{anchor?.remove();if(url)environment.URL.revokeObjectURL(url);}
}
