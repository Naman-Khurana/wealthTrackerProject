# Wealth Tracker

A full-stack personal finance management application built with **Spring Boot** and **Next.js**. Track expenses, earnings, budgets, and stock investments - all in one place.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Backend | Java, Spring Boot, Hibernate/JPA, MySQL |
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Auth | JWT-based authentication |
| External API | Financial Modeling Prep (stock data) |

---

## Features

- **Expense Tracking** — Add, update, and delete expenses with category-based organization (Essential vs. Luxury)
- **Earnings Management** — Log and manage income sources with date range filtering
- **Budget Planning** — Set weekly, monthly, or yearly budgets per category with real-time tracking against actual spending
- **Stock Market Integration** — Browse available stocks and fetch live/historical company data via Financial Modeling Prep API
- **Dashboard Overview** — Unified view of your financial health across expenses and earnings
- **Role-Based Access** — Stock listing restricted to Premium users and Admins; admin-only endpoints for user management and insights
- **JWT Authentication** — Stateless, token-based auth with signup, login, and account deletion

---

## Project Structure

```
wealthTrackerProject/
├── WealthTracker/              # Spring Boot backend
├── wealth-tracker-frontend/    # Next.js frontend
├── wealthtracker-code-file/    # Supplementary code files
└── SqlScripts/                 # MySQL setup scripts
```

---

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL
- [Financial Modeling Prep API key](https://financialmodelingprep.com/developer/docs)

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Naman-Khurana/wealthTrackerProject.git
   cd wealthTrackerProject/WealthTracker
   ```

2. Create MySQL database and run setup scripts in order:
   ```sql
   -- Run these from the SqlScripts/ directory
   01-script.sql       -- Creates base tables
   01-extended.sql     -- Creates budget table
   ```

3. Configure `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/wealthTracker
   spring.datasource.username=YOUR_DB_USER
   spring.datasource.password=YOUR_DB_PASSWORD

   jwt.secret=YOUR_JWT_SECRET
   jwt.expiration=86400000

   fmp.api.key=YOUR_FMP_API_KEY
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

```bash
cd wealth-tracker-frontend
npm install
npm run dev
```

---

## Contact

**Naman Khurana** — [namankhurana2017@gmail.com](mailto:namankhurana2017@gmail.com) · [GitHub](https://github.com/Naman-Khurana)
