# Attendance Management System - Server
Attendance management system 為一個考勤管理系統。使用者可登入系統後打卡，亦可查詢自己的每日出勤紀錄。

此為後端伺服器，部署於 Heroku。可直接使用以下 base URL:

```
https://dry-ridge-01972.herokuapp.com/
```

前端尚未完成，故抱歉目前尚無 demo 網站。

相關連結：

[API 文件](https://dry-ridge-01972.herokuapp.com/api-doc/) | [前端 Repo（建置中）](https://github.com/rubylo718/attendance-mgt-client)


## Login Account
- 使用者 account: 1001, password: titaner
- 管理者 account: admin, password: tiadmin


## Features
### Current Features
#### 認證
- 所有帳號為資料庫匯入，無註冊功能
- 透過 JWT 進行認證登入，token 效期為一天
- 登入之外之路由皆需驗證登入者身份
- 使用者登入時密碼輸入錯誤 5 次以上時，帳號上鎖無法再登入

#### 使用者功能
- 使用者可以修改自己的密碼
- 使用者可以打卡
- 使用者可以查看自己的出勤紀錄與狀態

#### 出勤計算
- 使用者打卡後，依打卡時間計算打卡時間之工作日（工作日換日時間為隔日上午 5 點）
- 依照政府行事曆判定工作日是否為上班日
- 若為上班日，系統會計算並判定出勤狀態；若為假日，則不計算出勤狀態
- 出勤狀態正常：指同一工作日內，首次打卡與最後一次打卡時間間隔超過 9 小時（預設為常日班，午休 1 小時），其餘狀況皆判定為出勤狀態異常

#### 管理者功能
- 匯入行事曆以判定上班或休假日


### To be Developed
#### 使用者功能
- 打卡 GPS 位置驗證（位置需在距離指定地點 400 公尺內）
- 掃描 QR Code 打卡

#### 管理者功能
- 僅有管理者可登入之後台系統，使用者無法登入
- 查看出勤異常者帳號
- 修改使用者出勤狀態
- 使用者帳號上鎖時通知管理者
- 解除使用者帳號上鎖狀態
- 通知管理者工作日無打卡記錄之使用者名單

## 資料設計 ERD
![Image](https://i.imgur.com/aXo9X00.png)

## Built with
- Node.js
- Express
- MySQL
- Swagger for API docs following OpenAPI 3.0

## Author
Ruby Lo