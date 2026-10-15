# F4 第2段階 バックアップファイルの実装binding

F3承認対象 `3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641` の2〜5章、8〜10章に基づく書出し仕様の具体化。IndexedDB canonical schema・ACTIVE registry・質問manifestは変更しない。取込・復元・再適用は本実装に含まない。

## 正常ファイル

UTF-8/BOMなし、JSON.stringifyのcompact JSON。root順は fileFormat / fileFormatVersion / kind / exportedAt / snapshot / pending / checksum。

- fileFormat: yattoko-backup
- fileFormatVersion: ACTIVE registryの1
- kind: normal / emergency
- exportedAt: UTC YYYY-MM-DDTHH:mm:ss.sssZ（端末時計の参考値）
- snapshot: F2 projection。そのfield・record・answers順を再利用。
- pending: normalでは必ずnull。emergencyは以下の規範形、候補0件ではnull。
- checksum: algorithm / hex の順。SHA-256、lowercase hex64文字。checksumを除く6 root fieldのcanonical JSON UTF-8が対象。

filenameは yattoko-backup または yattoko-emergency + UTC YYYYMMDD-HHMMSS + checksum先頭8hex + .json。利用者由来の値を含めない。

## pending field order

captureStatus / candidateCount / exportedCount / omittedCount / omittedScopes / baseGenerationId / baseGlobalRevision / baseSnapshotChecksumSha256 / baseContentFingerprintSha256 / operations。

captureStatusはfull / partial / none。candidateCountはfreezeしたconfirmed/dependent operationとcurrent draftの合計。mutationSeq、DOM、画面位置、任意メモ、raw不正値は収録しない。

omittedScopesの各object順: categoryKey / targetKind / operationType / ordinalStart / ordinalEnd / reasonCode。unknown入力値からscope文字列を作らず、固定allowlist以外はnull/unknown/unsupportedへ分類。全件未収録のsummaryでは同じscopeかつ連続するordinalだけを集約する。他scopeや収録済み操作を挟む非連続ordinalは別範囲として保持する。各範囲の件数合計はomittedCountに一致し、重複・収録済みordinalの混入を認めない。不正値やサービス名は未収録scopeに入れない。通常保存用allowlistで既知のdeleteAllは未収録scopeに限りoperationType=deleteAll / targetKind=overviewとして表すことができる（実行可能operationではない）。UNSUPPORTED_OPERATIONで候補を除外し、依存componentの全件を未収録とする。未知操作はunsupported / unknownへ分類する。正確な範囲情報だけでも既存pending容量上限を超える場合は、範囲を切り捨てずファイル生成を停止する。

## operation field order

operationId / ordinal / operationType / targetKind / categoryKey / recordId / baseGenerationId / baseGlobalRevision / baseRecordRevision / dependsOnOperationIds / captureKind / canonicalValue / dependencyContext。

- operationId: op_ + lowercase UUIDv4。capture内一意、衝突は最大3回試行、生成失敗ならcomponentを除外。認証・真正性証明ではない。
- ordinal: freeze候補の1始まり順序。除外後も番号を詰めない。
- operationType: 緊急pending専用allowlist（category / overview / addService / service / completeService / deleteService / deleteCategory）。通常保存用allowlistと分離し、deleteAll / restore等は収録・取込・再適用を禁止する（F3 R01-14）。通常のdeleteAll保存と成功時のgeneration更新は維持する。
- targetKind: category / overview / service。deleteAll候補は収録不可だが、依存関係検査では全recordへのfootprintを持ち、同じcomponent全体を未収録とする。
- categoryKey: 対象category、overviewではnull。
- recordId: service IDまたは対象canonical record ID。
- baseRecordRevision: snapshot時の対象revision、新規serviceではnull。
- dependsOnOperationIds: 同一component内で対象・親整合・conditional contextが重なる先行操作ID。順序を変更しない。後方参照・cycleを生成しない。
- captureKind: confirmed-pending / dependent-pending / current-draft。未確定draftを確定回答へ読み替えない。
- canonicalValue: category/overview/service変更は field / value、service追加は serviceCatalogId / otherServiceName、それ以外はnull。IDとcategoryはtarget identity側にのみ格納。
- dependencyContextの順: expectedValue / parentQuestionKey / parentAnswer。現在値の期待と、conditional質問の親key/回答。非該当はnull。

pendingのbaseはsnapshotとgeneration/global/record revisionsを照合する。対象service、parent category、positive整合のoverview、削除範囲が重なる操作を保守的に同componentとする。componentを順番に純粋検証し、1件でも失敗したらcomponent全体を除外。独立valid componentのみ収録可能。

baseSnapshotChecksumSha256はF2 projection全体のcompact JSON UTF-8のSHA-256。
baseContentFingerprintSha256はprojectionからoverview/categories/servicesだけをこの順で取り、各recordのrevision/schemaVersionを除いた内容のcompact JSON UTF-8のSHA-256。ID、質問順、record順は維持する。generation/global/revisionを含めない内容比較用であり、既適用・真正性の証拠に使わない。

## 容量と非保存検証

- committed snapshotは承認済み10,000,000 UTF-8 bytes以下。
- raw16,000,000 / pending1,000,000 / candidates256はPROVISIONAL。
- pending bytesはcapture summaryを含むpending object全体のcanonical JSON UTF-8。
- candidateCountまたはpending bytesが超過したら、候補全体をnoneにし、未収録件数・範囲だけを残す。prefix/suffixを切って救済しない。
- pending自体は10MB保存制限の外。純粋mutation検証のみ容量検査を無効化して利用できる。CanonicalStore.saveは引き続き常に容量検査し、exportはreadしか行わない。
- dataset未作成では通常/緊急とも空のsnapshotを捏造せず、保存済みデータなしと表示する。snapshot必須のF3境界を維持。
- 正本が不正・読取不能ならバックアップを生成しない。エラーで画面値を消さない。

## UI・媒体

平文注意・対象/対象外・暫定値を表示し、利用者の確認後に生成。生成後に収録/未収録summaryを示し、別の明示操作で保存へ進む。noneでは確定済み部分と未収録summaryだけであることを示す。

対応browserではFile System Access picker、その他ではBlob URL + download anchor。picker cancelはcancelled、anchorではキャンセル検知不能を明示。API成功でも保存操作開始のみを表示し、物理保存完了を保証しない。元のpending/formをclear・commit・再適用しない。
