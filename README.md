# 💰 WealthTracker — Full-Stack Personal Finance Management Platform

<div align="center">

**A production-grade personal finance management application built with Spring Boot & Next.js**

[![Java](https://img.shields.io/badge/Java-23-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Security](#-security)

---

## 🌟 Overview

**WealthTracker** is a comprehensive full-stack personal finance management platform that empowers users to track expenses, monitor earnings, set budgets, and gain insights into their financial health. Built with a modern microservice-oriented architecture, it features a robust Spring Boot REST API backend paired with a sleek, responsive Next.js frontend — all containerized with Docker for seamless deployment.

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based stateless authentication** with access tokens (HttpOnly cookies) and refresh tokens
- **Automatic token refresh** — Axios interceptors silently handle expired tokens with deduplication logic
- **Role-Based Access Control (RBAC)** — Three-tier role system: `USER`, `PREMIUM_USER`, `ADMIN`
- **Secure password management** — BCrypt-hashed passwords with change-password flow
- **User registration & login** with server-side validation (Bean Validation / Jakarta Validation)
- **Secure logout** with cookie invalidation (maxAge=0)
- **Spring Security filter chain** with custom `JwtAuthenticationFilter`
- **Method-level security** via `@PreAuthorize` annotations

### 💸 Expense Management
- **Full CRUD operations** — Add, view, update, and delete expenses
- **Category-wise tracking** — Expenses organized into **Essential** (Groceries, Rent, Utilities, etc.) and **Luxury** (Entertainment, Travel, Dining, etc.) categories
- **Date-range filtering** — Filter expenses by custom start/end dates
- **Monthly trend analysis** — View last 6 months of expense data for trend visualization
- **Recent transactions** — Fetch the N most recent expense transactions
- **Sub-category expense totals** — Breakdown of spending by Essential vs Luxury categories
- **Category-wise percentage analysis** — Visualize where your money goes

### 💰 Earnings Management
- **Full CRUD operations** — Track all income sources
- **Income-type-wise breakdown** — Categorize earnings by income type (e.g., Salary, Freelance, Investment)
- **Date-range filtering** — Filter earnings by custom date ranges
- **Monthly trend analysis** — Last 6 months of earnings data
- **Transaction-level detail view** — Drill into individual earning records

### 📊 Budget Management
- **Set budgets by category** — Create budgets for specific expense categories, parent categories (Essential/Luxury), or total expenses
- **Flexible budget ranges** — Support for `MONTHLY`, `YEARLY`, and `CUSTOM` date range budgets
- **Budget usage tracking** — Real-time percentage of budget consumed per category
- **Conflict resolution** — Automatic handling of overlapping budget entries
- **Hierarchical budget constraints** — Budget validation cascades from sub-category → parent category → total expenses
- **Multi-category budget overview** — View budget usage across all categories at once

### 📈 Dashboard & Analytics
- **Centralized dashboard** — At-a-glance financial overview with aggregated metrics
- **Interactive charts** — Built with Chart.js + react-chartjs-2 for dynamic data visualization
- **Monthly earnings vs expenses comparison** — Side-by-side trend analysis
- **Budget usage indicators** — Visual progress bars for budget consumption
- **Total earnings & expenses summary** — Quick financial health snapshot

### 📉 Stock Market Integration (Premium Feature)
- **Real-time stock price data** — Fetch live stock prices via external API integration
- **Company search** — Look up stock info by company name using Tradable Search API
- **Stock listing** — Browse available stocks and their current prices
- **Premium-only access** — Gated behind `PREMIUM_USER` role with `@PreAuthorize`

### 👤 User Profile & Settings
- **Profile management** — Update first name, last name, email, phone number
- **User settings** — Personalized app preferences
- **Subscription management** — Track and manage user subscription plans
- **MapStruct-powered mapping** — Clean DTO-to-entity transformations with partial updates

### 🛡️ Admin Panel
- **Admin-only endpoints** — Protected with `ADMIN` role authorization
- **User management capabilities** — Administrative control over the platform

### 🎨 Frontend Experience
- **Modern, responsive UI** — Built with Next.js 15 App Router and React 19
- **Smooth animations** — Framer Motion for page transitions and micro-interactions
- **Component library** — Radix UI + HeroUI primitives for accessible, polished components
- **Dark mode support** — TailwindCSS 4 with custom theming
- **Date picker** — React Day Picker for intuitive date selection
- **Advanced select inputs** — React Select for category and filter dropdowns
- **Turbopack dev server** — Lightning-fast development experience
- **Auth context** — React Context API for global authentication state management
- **Filter context** — Dedicated context for earnings/expenses filter state
- **Modal management** — Centralized modal context for consistent dialog behavior
- **Next.js Middleware** — Route protection and auth guards on the frontend

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Java 23** | Core language |
| **Spring Boot 3.4.1** | Application framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | ORM & database access |
| **JWT (jjwt 0.12.6)** | Stateless token-based authentication |
| **MySQL 8** | Relational database |
| **Lombok** | Boilerplate reduction |
| **MapStruct 1.5.5** | Type-safe DTO ↔ Entity mapping |
| **Bean Validation (Jakarta)** | Input validation |
| **Spring WebSocket** | Real-time communication support |
| **Maven** | Build & dependency management |

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React meta-framework (App Router) |
| **React 19** | UI library |
| **TypeScript 5** | Type-safe JavaScript |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Chart.js + react-chartjs-2** | Data visualization & charts |
| **Framer Motion** | Animations & transitions |
| **TanStack React Query** | Server state management & caching |
| **Axios** | HTTP client with interceptors |
| **Radix UI** | Accessible headless UI primitives |
| **HeroUI** | Component library |
| **Lucide React** | Icon library |
| **React Day Picker** | Date selection component |
| **React Select** | Advanced select/dropdown component |

### DevOps & Infrastructure
| Technology | Purpose |
|---|---|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Turbopack** | Next.js dev server bundler |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Docker Compose                        │
│                                                              │
│  ┌──────────────┐    ┌──────────────────┐   ┌────────────┐  │
│  │   Frontend    │    │     Backend      │   │   MySQL 8  │  │
│  │  (Next.js)   │───▶│  (Spring Boot)   │──▶│  Database   │  │
│  │  Port: 3000  │    │   Port: 8080     │   │ Port: 3307  │  │
│  └──────────────┘    └──────────────────┘   └────────────┘  │
│                              │                               │
│                              ▼                               │
│                      ┌──────────────┐                        │
│                      │ External APIs │                        │
│                      │ (Stock Market)│                        │
│                      └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Backend Architecture Pattern (Layered)
```
Controller (REST) → Service (Business Logic) → Repository (Data Access) → Database
     ↕                      ↕                          ↕
   DTOs              Entity ↔ DTO              JPA Entities
  (Validation)       (MapStruct)              (MySQL Tables)
```

---

## 🔗 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/register` | Register a new user | Public |
| `POST` | `/login` | Authenticate & receive JWT | Public |
| `POST` | `/logout` | Invalidate session cookies | Authenticated |
| `POST` | `/refresh-token` | Refresh expired JWT | Public |
| `POST` | `/change-password` | Update password & logout | Authenticated |
| `DELETE` | `/{userid}` | Delete user account | Owner only |

### Expenses (`/api/expenses`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/` | Get expenses home data (with optional date filter) | Authenticated |
| `POST` | `/add` | Add a new expense | Authenticated |
| `PUT` | `/update` | Update an existing expense | Authenticated |
| `DELETE` | `/delete/{expenseid}` | Delete an expense | Authenticated |
| `GET` | `/{expenseid}` | Get expense details by ID | Authenticated |
| `GET` | `/essential` | Get essential category totals | Authenticated |
| `GET` | `/luxury` | Get luxury category totals | Authenticated |
| `GET` | `/lastSixMonthsData` | Monthly expense trends | Authenticated |
| `GET` | `/recentExpenses?n=` | Get N recent transactions | Authenticated |

### Earnings (`/api/earnings`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/` | Get earnings home data (with optional date filter) | Authenticated |
| `POST` | `/` | Add a new earning | Authenticated |
| `PUT` | `/` | Update an existing earning | Authenticated |
| `DELETE` | `/delete/{earningid}` | Delete an earning | Authenticated |
| `GET` | `/{earningid}` | Get earning details by ID | Authenticated |
| `GET` | `/transactions` | Get earnings with transaction details | Authenticated |
| `GET` | `/lastSixMonthsData` | Monthly earning trends | Authenticated |
| `GET` | `/income-type-wise` | Earnings breakdown by income type | Authenticated |

### Budget (`/api/budget`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/set` | Set/update a budget | Authenticated |
| `GET` | `/` | Get all user budgets | Authenticated |
| `GET` | `/usage` | Get budget usage percentage | Authenticated |
| `GET` | `/usage/all` | Get all categories budget usage | Authenticated |

### Dashboard (`/api/dashboard`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/` | Get aggregated dashboard data | Authenticated |

### Stock Market (`/api/{userid}/invest/stock`) — Premium
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/list` | Get stock price list | Premium/Admin |
| `GET` | `/{companyName}` | Get stock by company name | Premium/Admin |
| `GET` | `/company/{companyName}` | Search company stock info | Premium/Admin |

---

## 🚀 Getting Started

### Prerequisites
- **Docker** & **Docker Compose** installed
- OR for local development:
  - **Java 23** (JDK)
  - **Node.js 18+** & **npm**
  - **MySQL 8**
  - **Maven**

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/your-username/WealthTracker.git
cd WealthTracker

# Start all services (MySQL + Backend + Frontend)
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MySQL**: localhost:3307

### Local Development Setup

**Backend:**
```bash
cd wealthtracker-code-file

# Configure MySQL connection in application.properties
# Build & run
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd wealth-tracker-frontend

# Install dependencies
npm install

# Start dev server with Turbopack
npm run dev
```

---

## 📁 Project Structure

```
WealthTracker/
├── docker-compose.yml                 # Multi-container orchestration
├── SqlScripts/                        # Database initialization scripts
│
├── wealthtracker-code-file/           # ☕ Spring Boot Backend
│   ├── pom.xml                        # Maven dependencies
│   └── src/main/java/.../wealthtracker/
│       ├── Security/                  # JWT filter, util, user details service
│       ├── StocksAPI/                 # Stock market API integration
│       ├── config/                    # Security config, CORS, password encoder
│       ├── customDataType/            # Custom data types (BudgetRangeCategory)
│       ├── dao/                       # JPA repositories (data access layer)
│       ├── dto/                       # Data Transfer Objects
│       ├── entity/                    # JPA entities (AccountHolder, Expenses, etc.)
│       ├── enums/                     # Enumerations (AuthCookieType, IncomeType)
│       ├── error/                     # Custom exception classes
│       ├── mapper/                    # MapStruct mappers
│       ├── restcontroller/            # REST API controllers
│       ├── service/                   # Business logic layer
│       ├── utils/                     # Utility classes
│       └── validator/                 # Custom validators
│
├── wealth-tracker-frontend/           # ⚛️ Next.js Frontend
│   ├── package.json
│   └── src/
│       ├── app/
│       │   ├── (auth)/                # Auth pages (login, register)
│       │   └── (site)/                # Protected pages
│       │       ├── dashboard/         # Dashboard page
│       │       ├── expenses/          # Expenses management page
│       │       ├── earnings/          # Earnings management page
│       │       └── profile/           # User profile page
│       ├── components/
│       │   ├── dashboard/             # Dashboard charts & widgets
│       │   ├── earnings/              # Earnings UI components
│       │   ├── expenses/              # Expenses UI components
│       │   ├── navbar/                # Navigation bar
│       │   ├── Profile/               # Profile management components
│       │   ├── auth/                  # Auth form components
│       │   ├── ui/                    # Reusable UI primitives
│       │   └── global/                # Global shared components
│       ├── context/                   # React contexts (auth, filters, modals)
│       ├── constants/                 # API base URL & constants
│       ├── lib/                       # Axios instance with interceptors
│       ├── type/                      # TypeScript type definitions
│       └── middleware.ts              # Next.js route middleware (auth guard)
```

---

## 🔒 Security

| Feature | Implementation |
|---|---|
| **Authentication** | JWT access tokens + refresh tokens in HttpOnly cookies |
| **Password Storage** | BCrypt hashing via `PasswordEncoderConfig` |
| **Session Management** | Stateless (`SessionCreationPolicy.STATELESS`) |
| **CORS** | Configured allow-list (localhost:3000, localhost:8080) |
| **CSRF** | Disabled (stateless JWT-based auth) |
| **Cookie Security** | `HttpOnly`, `SameSite=Strict`, scoped `path=/` |
| **Route Protection** | Frontend middleware + backend `@PreAuthorize` |
| **Token Refresh** | Automatic silent refresh with Axios interceptors & deduplication |
| **Owner Verification** | `@PreAuthorize("#userid.toString() == principal.username")` |

---

## 📌 Key Technical Highlights (Resume-Worthy)

- **Full-stack production architecture** — RESTful API with layered architecture (Controller → Service → Repository)
- **JWT Authentication with Refresh Token Rotation** — Secure, stateless auth with HttpOnly cookie-based token management
- **Role-Based Access Control (RBAC)** — Three-tier authorization (USER / PREMIUM_USER / ADMIN) using Spring Security
- **Automatic Token Refresh** — Custom Axios interceptors with request deduplication to silently refresh expired JWTs
- **Budget Constraint Engine** — Hierarchical budget validation across sub-category → parent-category → total expense levels
- **Real-time Stock Market API Integration** — External API consumption with premium-gated access
- **MapStruct DTO Mapping** — Type-safe, compile-time entity ↔ DTO transformations with partial update support
- **Docker Compose Orchestration** — Full-stack containerization (MySQL + Spring Boot + Next.js) with networking and volumes
- **Next.js 15 App Router** — Modern file-based routing with route groups, layouts, and middleware-based auth guards
- **Server State Management** — TanStack React Query for caching, background refetching, and optimistic updates
- **Responsive Data Visualization** — Interactive Chart.js dashboards with monthly trend analysis
- **Bean Validation** — Server-side input validation with custom validators and global exception handling
- **WebSocket Support** — Real-time notification infrastructure ready

---

<div align="center">

**Built with ❤️ by Naman Khurana**

</div>
