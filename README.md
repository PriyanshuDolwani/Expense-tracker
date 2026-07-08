# 💰 Expense Tracker

A full-stack personal finance management application built using the MERN stack. This application enables users to securely track income and expenses, manage monthly budgets, visualize spending patterns, and monitor their financial health through an interactive dashboard.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration and Login
* Secure password hashing using **bcrypt**
* JWT-based authentication
* Protected routes for authenticated users only
* Persistent login sessions using Local Storage

### 💸 Transaction Management

* Add income and expense transactions
* Delete transactions
* Categorize transactions (Food, Travel, Bills, etc.)
* Automatic balance calculation
* User-specific transaction isolation

### 📊 Analytics Dashboard

* Total Income overview
* Total Expense overview
* Current Balance tracking
* Interactive charts powered by **Recharts**
* Category-wise spending visualization

### 🎯 Budget Management

* Set monthly budgets
* Track remaining budget
* Dynamic budget utilization progress bar
* Budget overspending alerts
* User-specific budget storage

### ⚙️ User Experience

* Personalized greetings
* Responsive multi-page interface
* Sidebar navigation
* Settings page
* Logout functionality

---

## 🏗️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Recharts
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Tokens)
* bcryptjs

### Development Tools

* Nodemon
* Git & GitHub

---

## 📂 Project Structure

```bash
expense-tracker/
│
├── client/                     # Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                     # Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---




## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

---

### 2. Setup Backend

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:5000
```

---

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## 🔑 Environment Variables

The following environment variables are required:

| Variable   | Description                     |
| ---------- | ------------------------------- |
| PORT       | Backend server port             |
| MONGO_URI  | MongoDB connection string       |
| JWT_SECRET | Secret key used for JWT signing |

---

## 🔒 Authentication Flow

1. User registers an account.
2. Password is securely hashed using bcrypt.
3. User logs in with email and password.
4. Server generates a JWT token.
5. Token is stored in Local Storage.
6. Frontend sends token with every protected request.
7. Backend middleware validates the token before granting access.

---

## 📈 Future Improvements

* Profile editing
* Dark mode support
* Recurring transactions
* Expense export (PDF/CSV)
* Email notifications
* Category-specific budgets
* Advanced analytics
* Mobile application support

---

## 🧪 Testing Checklist

* User Registration
* User Login
* Protected Routes
* Transaction CRUD Operations
* Budget Management
* Multi-user Data Isolation
* Analytics Visualization
* Logout Flow

---

## 🤝 Contributing

Contributions are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push to your branch.

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request.

---


Built with ❤️ using the MERN Stack.

