# Wealth Tracker Application

A Spring Boot application for tracking personal finances, including expenses, earnings, budgets, and stock market investments with comprehensive budget management and insights.

## Project Overview

This application provides a comprehensive system for users to manage their financial data, including:
- Expense tracking with category-based organization
- Earnings management and tracking
- Sophisticated budget planning with multi-level constraints
- Category-based financial management (Essential vs Luxury)
- Stock market investment tracking and analysis
- Role-based access control
- JWT-based authentication
- Financial insights and analytics

## Database Schema

### Account Holder Table
```sql
CREATE TABLE `account_holder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) UNIQUE NOT NULL,
  `password` varchar(68) NOT NULL,
  PRIMARY KEY (`id`)
)
```

### Roles Table
```sql
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `authorities5_idx_1` (`user_id`,`role`),
  FOREIGN KEY (`user_id`) REFERENCES `account_holder`(`id`)
)
```

### Earnings Table
```sql
CREATE TABLE `earnings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` int NOT NULL,
  `account_holder_id` int,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`account_holder_id`) REFERENCES `account_holder` (`id`)
)
```

### Expenses Table
```sql
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` int NOT NULL,
  `account_holder_id` int,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`account_holder_id`) REFERENCES `account_holder` (`id`)
)
```

### Budget Table
```sql
CREATE TABLE `budget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(50) NOT NULL,
  `amount` int NOT NULL,
  `start_date` DATE DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `account_holder_id` int,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_categerory_unique` (`account_holder_id`,`category`),
  FOREIGN KEY (`account_holder_id`) REFERENCES `account_holder` (`id`)
)
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - Authenticate user and receive JWT token
- `DELETE /{userid}` - Delete user account (requires authentication)

### Dashboard (`/api/{userid}/dashboard`)
- `GET /` - Get user's financial overview including expenses and earnings

### Expenses (`/api/{userid}/expenses`)
- `GET /` - Get all expenses (supports date range filtering)
- `POST /add` - Add new expense
- `PUT /update` - Update existing expense
- `DELETE /delete/{expenseid}` - Delete specific expense
- `GET /{expenseid}` - Get specific expense details
- `GET /essential` - Get total essential expenses
- `GET /luxury` - Get total luxury expenses

### Stock Market (`/api/{userid}/invest/stock`)
- `GET /list` - Get list of available stocks (Premium users and Admin only)
- `GET /{companyName}` - Get specific company's stock information
- `GET /company/{companyName}` - Get detailed company information using Financial Modeling Prep API

### Budget (`/api/{userid}/expenses/budget`)
- `POST /set` - Set new budget
- `GET /get` - Get all budgets
- `PUT /update/{budgetId}` - Update existing budget

### Earnings (`/api/{userid}/earnings`)
- `GET /` - Get all earnings (supports date range filtering)
- `POST /add` - Add new earning
- `PUT /update` - Update existing earning
- `DELETE /delete/{earningid}` - Delete specific earning
- `GET /{earningid}` - Get specific earning details

### Users (`/api/users`)
- `GET /` - Get all users (admin only)

### Insights (`/api/insights`)
- `GET /expenses/{expenseId}` - Get expense insights (admin only, in development)

## Entity Structure

### AccountHolder
- Core user entity implementing Spring Security's UserDetails
- Stores basic user information:
  - First name (varchar(50))
  - Last name (varchar(50))
  - Email (varchar(50), unique)
  - Encrypted password (varchar(68))
- Has one-to-many relationships with:
  - Earnings
  - Expenses
  - Budgets
  - Roles

### Roles
- Stores user roles for authorization
- Fields:
  - Role name (varchar(50))
  - User ID reference
- Unique constraint on user_id and role combination

### Budget
- Stores budget information per category
- Fields:
  - Category (varchar(50))
  - Amount (integer)
  - Start date (date)
  - End date (date)
  - Account holder reference
- Unique constraint on account_holder_id and category combination

### Categories
Pre-defined expense and earning categories:

Essential Categories:
- Food
- Housing
- Transportation
- Healthcare
- Education
- Insurance
- Savings

Luxury Categories:
- Entertainment
- Dining Out
- Vacations/Travel
- Personal Care
- Technology
- Fashion
- Gifts

## Security Implementation

### Authentication Flow
1. **JWT-Based Authentication** (Replaces Session-Based Security)
   - Stateless authentication using JSON Web Tokens
   - Tokens contain encrypted user information and permissions
   - Client must include JWT in Authorization header for protected routes
   - No server-side session storage required
   - Token structure:
     - Header: Algorithm and token type
     - Payload: User ID, roles, and expiration time
     - Signature: Ensures token integrity

2. **Token Management**
   - Access tokens valid for 24 hours
   - Refresh token functionality for extended sessions
   - Automatic token invalidation on logout
   - Token blacklisting for compromised credentials

## Stock Market Integration

### Financial Modeling Prep API Integration
The application uses Financial Modeling Prep API for real-time and historical stock data.

#### Data Retrieved:
- Real-time stock quotes
- Historical price data
- Company profiles and financials
- Market news and updates

#### API Rate Limits:
- Free Tier: 250 requests/day
- Premium Tier: 50,000 requests/day
- Enterprise: Unlimited requests

#### Sample API Response:
```json
{
    "symbol": "AAPL",
    "price": 178.72,
    "change": 2.35,
    "changesPercentage": 1.33,
    "volume": 57612440,
    "marketCap": 2800986542080,
    "lastUpdated": "2024-02-06 16:00:00"
}
```

### Error Handling:
- Automatic retry for failed API requests (max 3 attempts)
- Fallback to cached data if API is unavailable
- Rate limit monitoring and user notifications

## Budget Management

### Budget Implementation
The budget system allows users to set and track spending limits across different categories.

#### Budget Features:
- Category-based budget allocation
- Time-period specific budgets (weekly, monthly, yearly)
- Automatic budget reset on period completion
- Real-time spending alerts
- Budget vs. actual expense analysis

#### Budget Creation Example:
```json
POST /api/{userid}/expenses/budget/set
Content-Type: application/json

{
    "category": "Food",
    "amount": 5000,
    "start_date": "2025-01-01",
    "end_date": "2025-01-31",
    "alert_threshold": 80  // Optional: Alert when 80% of budget is used
}
```

#### Budget Update Example:
```json
PUT /api/{userid}/expenses/budget/update/{budgetId}
Content-Type: application/json

{
    "amount": 6000,
    "end_date": "2025-02-28"  // Extend budget period
}
```

### Budget Analytics
The system provides various analytical insights for budget management:

1. **Category Analysis**
   - Spending patterns by category
   - Budget utilization percentages
   - Trend analysis across periods

2. **Alerts and Notifications**
   - Threshold-based alerts (e.g., 80% of budget reached)
   - Period-end summaries
   - Overspending notifications

3. **Budget Reports**
   - Monthly budget vs. actual comparison
   - Category-wise budget adherence
   - Savings recommendations based on spending patterns

## Getting Started

1. **Prerequisites**
   - Java 17 or higher
   - Spring Boot 3.x
   - MySQL database
   - Financial Modeling Prep API key

2. **Database Setup**
   - Create MySQL database named `wealthTracker`
   - Run the provided SQL scripts in order:
     1. `01-script.sql` - Creates base tables and initial data
     2. `01-extended.sql` - Creates budget table

3. **Security Configuration**
   - Configure JWT secret key in application.properties
   - Set token expiration time
   - Configure CORS and CSRF settings
   - Set up Financial Modeling Prep API key

4. **Application Setup**
   - Clone the repository
   - Update application.properties with required credentials
   - Build and run using Maven/Gradle

## Contributing

When contributing to this project:
1. Fork the repository
2. Create a feature branch
3. Follow existing code style
4. Write tests for new features
5. Submit pull requests with detailed descriptions

## 📩 Contact

For any queries, reach out at: [**namankhurana2017@gmail.com**](mailto\:namankhurana2017@gmail.com)
