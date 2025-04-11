# SMS Business Card Bot (Node.js + PostgreSQL)

## 📌 Features
- Send real estate business cards via SMS (1-click)
- Manage contacts in PostgreSQL
- Supports multiple SMS gateways
- Detailed sending logs

## 🛠 Tech Stack
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- ًREST API
## ⚡ Quick Start

1. Clone repo:
```bash
git clone https://github.com/AryanElahi/Zhinga_managing_Bot_API.git)
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Run:
```bash
npm start
```

## 📋 ENV Configuration
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=smsbot
SMS_API_KEY=your_api_key
PORT=3000
```

## 📜 License
MIT
