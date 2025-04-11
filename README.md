# SMS Business Card Bot (Node.js + PostgreSQL)

This Telegram bot helps real estate agents efficiently share digital business cards via SMS. It provides a simple chat interface where users can submit their contact details (name, birth date, and phone number) which are then automatically sent as SMS business cards. The bot also offers functionality to retrieve all submitted contacts, making it easy to manage client information. Built with Node.js, it uses a state management system to guide users through the submission process and integrates with external SMS APIs for message delivery, providing a complete solution for professional contact sharing.

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
