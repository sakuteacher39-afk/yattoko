# 試験側observerの変更点

旧ファイルは変更していない。旧 `YTK-F5-auto-resume-b5-20261028/runner/adapter.mjs` の取得ごとの再wrapを、新フォルダ `runner/observer.mjs` に切り出して次のguardを追加した。

```diff
- const get = tx.objectStore.bind(tx);
+ const get = tx.objectStore.bind(tx), wrapped = new WeakSet();
  tx.objectStore = s => {
    const obj = get(s);
+   if (wrapped.has(obj)) return obj;
+   wrapped.add(obj);
    // put/delete/clearを一度だけwrap。引数・戻り値はそのまま渡す。
  };
```

WeakSetはtransactionごとに作成する。同じstore名だけで識別せずobjectの同一性を検査する。transactionのcomplete/abortを観測し、readwrite開始数から終端数を独立照合する。

旧証拠処理の `JSON.stringify({before, after, trace, actual}, null, 2)` を廃止し、新 `runner/engine.mjs` では各storeを個別JSON、traceを1イベントずつJSONLへ同期書き込む。単一巨大文字列を作らない。入力・期待データのprojection/schema/容量規則は変更しない。

例外はstack、発生段階、process.memoryUsage、記録件数をphaseファイルへ保存して伝播する。製品saveの通常のcapacity拒否は明示codeを検査し、RangeErrorをcapacity成功へ読み替えない。

製品ファイル、旧runner、旧fixture、旧ledger、旧正式結果は変更しない。
