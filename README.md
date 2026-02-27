# Wealth Tracker Application

A Full-Stack application for tracking personal finances, including expenses, earnings, budgets, and stock market investments with comprehensive budget management and insights.

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

## Security Implementation

### Authentication Flow
1. **JWT-Based Authentication** (Replaces Session-Based Security)
 

## Stock Market Integration

### Financial Modeling Prep API Integration
The application uses Financial Modeling Prep API for real-time and historical stock data.




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

### Budget Analytics
The system provides various analytical insights for budget management:

1. **Category Analysis**
   - Spending patterns by category
   - Budget utilization percentages
   - Trend analysis across periods

2. **Budget Reports**
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
4. Submit pull requests with detailed descriptions

## 📩 Contact

For any queries, reach out at: [**namankhurana2017@gmail.com**](mailto\:namankhurana2017@gmail.com)
