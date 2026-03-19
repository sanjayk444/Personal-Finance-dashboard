# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 💰 Personal Finance Dashboard (React)

A modern Personal Finance Dashboard built using React.js to track, analyze, and manage daily expenses efficiently.

---

## 🚀 Features

- ✅ Add, Edit, Delete expenses  
- ✅ Categories: Food, Rent, Fun, Travel  
- ✅ 📊 Pie Chart visualization (Recharts)  
- ✅ 📅 Filter by category & month  
- ✅ 💾 Data persistence using localStorage  
- ✅ 🌙 Dark Mode toggle  
- ✅ 🔍 Search functionality  
- ✅ 📁 Export expenses as CSV  
- ✅ 💵 Summary cards with total insights  
- ✅ Responsive UI  

---

## 🛠 Tech Stack

- React.js (Hooks)
- JavaScript (ES6+)
- Recharts
- CSS

---

## 📁 Project Structure
src/
├── assets/
├── components/
│ ├── DarkModeToggle.jsx
│ ├── ExpenseFilters.jsx
│ ├── ExpenseForm.jsx
│ ├── ExpenseList.jsx
│ ├── ExpensePieChart.jsx
│ ├── ExportCsvButton.jsx
│ └── SummaryCards.jsx
├── hooks/
│ └── useLocalStorage.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx


---

## ⚙️ Installation & Setup

## 🚀 Live Demo
🔗 https://personal-finance-dashboardd.netlify.app/

# Go to folder
cd finance-dashboard

# Install dependencies
npm install

# Install chart library
npm install recharts

# Run project
npm run dev
📊 Functionality

Users can add expenses with title, amount, category, and date

Expenses are stored in browser localStorage

Filters dynamically update results

Pie chart shows category-wise spending

Summary cards display total insights

CSV export allows downloading expense data

🎯 Learning Outcomes

React functional components

useState, useEffect hooks

Custom hooks (useLocalStorage)

Component-based architecture

Data persistence

Data visualization

🔮 Future Improvements

📱 Mobile-first UI improvements

🔔 Notifications / alerts

☁️ Backend integration (Firebase / Node.js)

⭐ Support

If you like this project, give it a ⭐ on GitHub!

👨‍💻 Author

Sanjay K
