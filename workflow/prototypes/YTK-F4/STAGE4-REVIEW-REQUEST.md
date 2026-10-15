# 制作管理室への独立レビュー依頼｜F4第4段階

レビュー対象: branch `codex/f4-stage4-integration` の提出commit（SHAは提出報告に記載）。基準 `8797650d0187daa521f859529ec4d9195e1b97bb`。

保存・退避・復元の統合確認と開発試験を完了しました。製品コードは変更せず、既存100件を維持して5件を追加し、105件すべて成功しています。詳細は STAGE4-REPORT.md / DEVELOPMENT-TEST-RESULTS.txt をご確認ください。

独立レビューでは次を確認してください。

1. 基準からの差分が試験・対応表・手順・報告のみで、schema/manifest/registryとR001/R002/R005が維持されていること。
2. 全画面フローのquota失敗→緊急退避→snapshot復元→確認付きpending適用、generation guard、未保存保持、HTML文字列表示のassertが期待を正しく検証していること。
3. F5-F6-TRACEABILITYの出典全ID、関連証拠と正式NOT RUNの区別、不足事項の扱いが妥当であること。F3計画案の正式化も別判断であること。
4. **F3:R01-14のdelete-all拒否期待と、既PASS baselineのdeleteAll pending許可との不一致を解消する判断。** この段階で製品挙動や計画期待を無断変更していません。
5. F6-DEVICE-PROCEDUREに基づき、最低対応端末・観測harness・暫定上限の実機評価・location.reload/物理保存の未実施を次工程へ残すこと。

判定は制作管理室にお願いします。本書は依頼文の提出であり、外部サービスへ送信していません。第4段階の提出後は停止し、F5/F6正式PASS、本番公開、R005凍結解除を宣言しません。
