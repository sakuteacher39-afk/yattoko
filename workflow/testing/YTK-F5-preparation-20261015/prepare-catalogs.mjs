import {source,output} from './prepare-lock.mjs';
const M=JSON.parse(source('workflow/specs/YTK-F4-canonical-question-manifest-v1.json'));
const faults=[
 ['NONE','faultなしcontrolを必ず実施','original fixture + production APIs','なし','全source hash/DB初期値が期待どおり'],
 ['TX-TRACE','request dispatch/success・abort/completeを同期event listenerで観測','harness wraps db.transaction/objectStore methods; returned native request/tx remain unchanged','promise/await/timerをproduct transaction callbackへ入れない','GUARD_READ→GUARD_VERIFIED→CLEAR→PUT→READBACK→READBACK_VERIFIED→TX_COMPLETE。内部verified flagが直接見えない場合bytes一致とphase traceの根拠を分け、見えないflagはNOT VERIFIABLE'],
 ['TX-ABORT','case指定のstore/method/第n success直後tx.abort','meta/category/service CLEAR/PUT/READBACKのrequest success listener','本番hook追加なし。each phaseを別run','abort後全store bytes一致。成功表示/receipt0。clear前後を区別'],
 ['REQUEST-HOLD','coordinator.save promiseのみをharness wrapperで保持しqueue/in-flightを観測','store.save delegate promise before/after complete; restore/readbackはnative事件順を観測','native transaction callbackの非同期化禁止','古いcompleteで新pending saved表示なし。IN_FLIGHT二重applyは1回write'],
 ['READBACK-ALTER','guardの4 store getAll後のREADBACK結果だけをalter','native request.result内のfixture record1byte/size/generation/global/count/revisionを同期success listenerで変更','guardやold stored recordsは変更しない。immutable resultの環境は明記し代替auditと区別','complete前abort。独立before/after canonical/raw全件一致'],
 ['OTHER-TAB','同一DBの別接続でcase指定時点に正常mutation/restore/deleteAllをcommit','preview後・capture前・reapply前・restore後のold expected','shared factoryを別profileと誤認しない。browserでは同一origin2tab','guard拒否。victimタブのforce overwriteなし。先行commitだけが残る'],
 ['DROP-NOTIFY','BroadcastChannelをharness stubで無通知にする','他のversion checksを変更しない','native storage guardを除去しない','通知なしでもstale generation/global/record拒否'],
 ['RAW-CORRUPT','専用DBをdirect IDB writeで事前破損/比較不能にする','meta missing/unknown values/cycle/read failure/closed DB','実利用originは禁止。破損はold dataset fixtureとして記録','VALID/EMPTY/CORRUPT_COMPARABLE/UNCOMPARABLEの分類と二段確認。比較不能は全置換禁止'],
 ['QUOTA','case指定のsave/PUTにQuotaExceededErrorをthrowまたはrequest failure','Node wrapperとChrome native wrapperを別証拠','実OS容量不足と人工quotaを混同しない','旧正本全件・pending維持。app10MBと別分類'],
 ['STORAGE-DENIED','IDB unavailable/SecurityError/closed DBを投入','factory/open/read/save入口','private detectorを追加しない','制限または不明の分類が根拠どおり。emptyと誤認しない'],
 ['UNKNOWN-ERROR','fixture sentinel入りのError/不明DOMExceptionを投入','save/import/export/file save入口','raw messageは画面/製品logへ流さない','最小codeのみ。画面の未保存保持。secret/bodyはsink0'],
 ['SHA-FAIL','crypto.subtle.digestのreject/不正長を投入','APIが引数で受けるcryptoは引数mock。その他は外部dependency mock','File/SHAをtransaction内へ移動しない','export/import成功なし、destination write0'],
 ['READ-FAIL','File.arrayBuffer/readのthrow/size mismatchを投入','最初のread前後にcalled count','実ファイルのデータを触らない','preflight停止、destination write0、UI入力維持'],
 ['FILE-SAVE-FAIL','picker cancel/AbortError/createWritable/write/close failure','requestFileSaveの環境dependency mock; browser native cancelも別実施','物理保存成功の保証に変更しない','取消/安全文言。元のpending保持'],
 ['RESOURCE-ERROR','巨大field/count/depth/例外を投入','scanner前後をcall count/heap profileで確認','サイズだけ不正fixtureの拒否を有効最大file成功としない','read/parse前拒否の順序と原因別分類、旧DB不変'],
 ['SAME-VALUE','expected-before/intended-after同値、外部同値editをfixture化','no-op/import/context/receiptの各境界','内容一致から適用済みを推測しない','AMBIGUOUS/UNPROVENまたは相当の拒否、write/receipt0'],
 ['PROVENANCE-LOSS','fresh session/tabまたは実browser reload/restart','session identity/source/generation/receiptをcase指定時点で喪失','Node再生成はrestart実証の代用にしない','auto-apply/skipなし。persistent ledgerなし。明示確認必須'],
 ['ID-GENERATOR','deterministic UUID列をharness dependencyで注入','occupied→fresh / occupied×3 / exception / getRandomValues fallback','固定SUTの通常crypto実装は変更しない','回数・衝突検査・fail closedとpending保持'],
 ['SOURCE-INPUT-FAULT','readFileSync/mock moduleでmanifest/原R001/R002/definitionsの返却値をvariantにする','source bytesは固定のまま、入力returnだけnegative driftを投入','改変した生成物を正式subjectに置換しない。mock成否は本物のfile checksumで検証','unknown/missing enum/key/condition/version mismatchは失敗。label-only semantic不変とunapproved source hash rejectionを分離'],
 ['REGISTRY-FAULT','compile-time registry exportのstatus/pairを外部module mockでvariantにする','原SUTをfresh processでimportする前だけinject','CANDIDATE配備を実際に製造した証拠ではない。UI disabledとAPI fail closedは別assert','unknown/old/future pair拒否、未ACTIVEAPI禁止。必要なUI配備が検証不能ならNOT VERIFIABLE'],
 ['SINK-SPY','fetch/XHR/beacon/WebSocket/EventSource/console全level/analytics相当をexternal observerで捕捉','browserはページ開始前にinstrumentし、外部宛ては送信前blockする','整理内容を記録しない。allowed static requestとexternal attemptを分離','fixture sentinelを含むpayload0、external application attempts0; 計測器のcontrol呼出を別記録']
].map(([id,trigger,injectionPoint,constraint,oracle])=>({id,trigger,injectionPoint,constraint,oracle,implementationLocation:'external F5 harness only; never subject sources',readiness:'PROCEDURE SPECIFIED; per-case adapter to be bound and recorded when formally executing'}));
output('FAULT-CATALOG.json',{scope:'preparation specification; no fault executed',faults,cleanup:'restore original property descriptors/listeners after each case, terminate profile/process, discard only its isolated DB. Next control case must pass environment sanity; do not carry mocks across cases.'});
output('VARIANT-RECIPES.json',{policy:'A case passes only when all original variants are instantiated and recorded; do not infer coverage from the base fixture or a related development title.',manifestCategoryKeys:M.categoryKeys,r001:M.r001,r002Questions:M.r002.questions,serviceCore:M.r002.serviceCore,recipes:[
 {id:'ENUM-EXACT',input:'manifestの全key/enum/presence/condition。unanswered/nullを除外しない',cases:'MAN/R08/R2INT/REG関連。正例全値＋unknown/missing/nested objectの負例',oracle:'approved normative manifest, not SUT output'},
 {id:'CONTROL-ALL',codePoints:['U+0000..001F','U+007F','U+0080..009F','U+061C','U+200E','U+200F','U+202A..202E','U+2066..2069'],input:'各code pointを「試験」前後/中央に挿入。Unicode escape・raw textを分離',cases:'TXT-05〜11 / R02-22'},
 {id:'UUID-ALL',variants:['lowercase v4 valid','uppercase','braces','v1','v7','invalid variant','prefix typo','duplicate','category ID mismatch','existing collision→fresh','collision×3','generator throw','primary randomUUID','fallback getRandomValues'],cases:'RID/GEN/ID/REG関連'},
 {id:'EXACT-BYTES',layers:{canonical:[9999999,10000000,10000001],pending:[999999,1000000,1000001],raw:[15999999,16000000,16000001]},input:'FIXTURES.json記載SHA/サイズを確認。canonical新generation/metaの長さもprospective layerで再照合',cases:'CAP/R03/R04。layer通過と全file受理を区別'},
 {id:'MISSING-UNKNOWN',input:'root/meta/overview/category/service/answers/pending/operation/context/checksum各objectでrequired1key欠落、unknown1key、__proto__/constructor/prototype、duplicate decoded keyを別byte fixtureへ導入',cases:'CAT/RST/R02/SEC関連。署名再計算版と据置版を分離'},
 {id:'TRANSACTION-PHASES',stores:['meta','overview','categories','services'],phases:['GUARD','CLEAR','PUT','READBACK','COMPLETE'],input:'各指定phase/store/first-middle-final request faultを別run。no-op/empty/valid/corruptの前提も個別に記録',cases:'SAVE/DEL/R03/RST関連'},
 {id:'REAPPLY-LIFECYCLE',input:'full/partial/none × sourceFileId/snapshotGen/restoredGen/global/operationId/receipt一致不一致、before==after、double tap、op1成功op2abort、reload/実restart、file紛失',cases:'R05/R01/RST関連'},
 {id:'ERROR-SIX',variants:['capacity','quota','restricted','conflict','temporary','unknown'],input:'根拠ある例外/根拠不足例外・pendingあり/なし・retry可/不可を分離',cases:'ERR/SAVE関連'}
]});
console.log('Prepared fault and variant specifications. No injection executed.');
