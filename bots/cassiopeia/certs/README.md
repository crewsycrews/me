# Доверенные CA для MAX API

`russian-trusted-ca.pem` содержит публичные PEM-сертификаты, загруженные
2026-10-05 с официального CDN Госуслуг по HTTPS с проверкой TLS:

- https://gu-st.ru/content/Other/doc/russian_trusted_root_ca.cer
- https://gu-st.ru/content/Other/doc/russian_trusted_sub_ca.cer

Документация MAX требует добавить сертификат Минцифры:
https://dev.max.ru/docs-api/methods/POST/messages

| Сертификат | Действует до (UTC) | SHA-256 отпечаток |
| --- | --- | --- |
| Russian Trusted Root CA | 2032-02-27 21:04:15 | D26D2D0231B7C39F92CC738512BA54103519E4405D68B5BD703E9788CA8ECF31 |
| Russian Trusted Sub CA | 2027-03-06 11:25:19 | BBBDE2103E790B999EC62BD03CF625A5A2E7C316E10AFE6A490EEDEAD8B3FD9B |

Подпись промежуточного сертификата проверена через `openssl verify` с этим корнем.
Публичные сертификаты хранятся в Git для воспроизводимой сборки: Docker не скачивает
доверенные корни при каждом деплое. Обновляйте bundle при ротации CA, до истечения
срока действия, проверяя источник, отпечатки и цепочку.

Docker задаёт `NODE_EXTRA_CA_CERTS=/app/certs/russian-trusted-ca.pem` для процесса
бота, включая скрипт подписки. Системное хранилище сервера не изменяется.
Стандартные CA Node.js сохраняются. `NODE_TLS_REJECT_UNAUTHORIZED=0` не используется.
