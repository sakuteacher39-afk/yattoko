# YTK-R005-C / C1 Test Matrix

状態: **C1 PARTIAL / BLOCKED**

## Local automated: 21 PASS / 0 FAIL

1. A0/A1拒否・A2許可
2. fresh A2
3. session revoke
4. protected/frozen拒否
5. principal/provider二重owner拒否
6. identity operation idempotency
7. link途中DB失敗fail-closed
8. unlink途中DB失敗fail-closed
9. unknown/D/catch-all field reject
10. `1Password` false positive回避
11. secret-like service名reject
12. R001/R002 upward consistency
13. hidden answer pruning
14. ephemeral crypto + AAD binding
15. Deletion Journal replay
16. allowlist logger本文非出力
17. BFF cross-user resource遮断
18. BFF A1本文遮断
19. local RS256 JWT/JWKS
20. JWT tamper/wrong issuer reject
21. JWT wrong audience/expiry reject

## Actual PostgreSQL: BLOCKED / NOT RUN

SQLと実行scriptは準備済み。ただし現作業環境にPostgreSQL server/clientとDockerがなく、package取得も利用不可。
mockではPASS扱いしない。実PostgreSQLでrole/RLS/transaction-local contextを実行してPASSするまでC1未完了。
