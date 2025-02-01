# Wealth Tracker Application

A comprehensive Spring Boot application for tracking personal finances, managing expenses, and monitoring investments.

## Features

### User Management
- User registration and authentication using Spring Security
- Role-based access control (USER, PREMIUM_USER, ADMIN)
- Secure password encryption using BCrypt
- Email validation with domain verification and format checking
- Multiple roles per user with eager fetching for fast access
- Bi-directional relationship management between users and their roles
- Custom authentication success handler with dashboard redirect
- Custom UserDetailsService for email-based authentication

### Expense Tracking
- Add, update, and delete expenses
- Categorize expenses (Essential vs Luxury)
- Essential categories: Food, Housing, Transportation, Healthcare, Education, Insurance, Savings
- Luxury categories: Entertainment, Dining Out, Vacations/Travel, Personal Care, Technology, Fashion, Gifts
- Filter expenses by date range with validation
- View expense summaries and detailed breakdowns
- Lazy loading of expenses for optimal performance
- Custom queries for category-specific expense retrieval
- Comprehensive DTO models for data transfer

### Budget Management
- Set budgets for specific categories
- Budget period customization with start and end dates
- Budget constraint validation across multiple levels
- Multiple budget levels:
  - Category-specific budgets
  - Parent category budgets (Essential/Luxury)
  - Total expense budgets
- Automatic budget violation notifications
- Date range validation for budget periods
- Default budget start date set to current date if not specified

### Earnings Management
- Track multiple income sources
- Add, update, and delete earnings records
- Filter earnings by date range with validation
- View earnings summaries and detailed reports
- Custom queries for date-based earnings analysis
- Bi-directional relationship with account holders
- DTO-based data transfer for earnings information

### Dashboard
- Overview of total expenses and earnings
- User-specific data 
- Budget constraint violation notifications within application
- Custom DTOs for dashboard data presentation:
  - DashboardHomeDTO for overview
  - EarningsHomeDataDTO for earnings details
  - ExpensesHomeDataDTO for expense details

### Investment Tracking (Premium Feature)
- Stock market integration using Financial Modeling Prep API
- Real-time stock price monitoring
- Company information lookup with fallback search
- Available only for PREMIUM_USER and ADMIN roles
- Support for multiple stock exchanges with NASDAQ preference
- Comprehensive company information including:
  - Company details (name, symbol, CEO, etc.)
  - Financial metrics
  - Exchange information
  - Stock price data

### Financial Insights (Upcoming Feature)(Premium Feature)
- Comprehensive analysis of user spending patterns
- Smart budget recommendations based on historical data
- Category-wise expense trend analysis
- Budget constraint violation patterns and recommendations
- Income vs. Expense correlation analysis
- Monthly, quarterly, and yearly financial health reports
- Customized saving suggestions based on spending habits
- Investment portfolio performance insights
- Predictive analysis for future expenses
- Smart alerts for potential budget overruns
- Comparative analysis with previous periods
- Financial goal tracking and progress monitoring
- Custom reporting with visualization options
- Machine learning-based expense categorization
- Anomaly detection in spending patterns

## Technical Implementation Details

### Security Implementation (Current)
```java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .and()
            .httpBasic();
    }
}
```

### Upcoming Security Changes
The application will be transitioning to JWT (JSON Web Token) based authentication:
- Stateless authentication using JWT tokens
- Token-based user session management
- Enhanced security with signature verification
- Configurable token expiration
- Refresh token support
- Token blacklisting for logout
- Role information embedded in JWT claims
- Cross-domain token validation
- Integration with existing role-based access control
- Custom JWT authentication filter

### Exception Handling
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDTO> handleAccessDeniedException(AccessDeniedException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO("Access Denied", ex.getMessage()), 
            HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO("Resource Not Found", ex.getMessage()), 
            HttpStatus.NOT_FOUND);
    }
}
```

### Entity Relationships
1. AccountHolder (Main Entity)
   - One-to-Many with Expenses (Lazy Loading)
   - One-to-Many with Earnings (Lazy Loading)
   - One-to-Many with Roles (Eager Loading)
   - One-to-Many with Budgets (Lazy Loading)
   - Implements bi-directional relationships

2. Budget Entity
   - Many-to-One with AccountHolder
   - Implements date validation
   - Automatic start date initialization
   - Category-based budget tracking

3. Expenses Entity
   - Many-to-One with AccountHolder
   - Implements date tracking
   - Category classification
   - Custom queries for filtered views

4. Earnings Entity
   - Many-to-One with AccountHolder
   - Date-based tracking
   - Category classification
   - Amount tracking

### Stock Market API Integration
```java
public interface StockMarketAPIService {
    List<StockPrice> getStockPriceByCompanyName();
    StockPrice getStockPriceByCompanyName(String companyName);
    CompanyInfoDTO getStockPriceByTradableSearchAPI(String companyName);
    JsonNode getNASDAQCompany(JsonNode responseBody);
}
```

### DTO Layer
The application uses comprehensive DTOs for data transfer:
- DashBoardHomeDTO: Overall financial summary
- EarningsHomeDataDTO: Earnings data with totals
- ExpenseOrEarningInDetailDTO: Detailed transaction information
- ExpensesHomeDataDTO: Expense summaries with budget violations
- FilteredExpenseOrEarningInfoDTO: Filtered transaction data
- RegisterUserDTO: User registration data
- CompanyInfoDTO: Stock market company information

## API Endpoints

### Authentication
```
POST /api/auth/signup - Register new user
DELETE /api/auth/{userid} - Delete user account
```

### Budget Management
```
POST /api/{userid}/expenses/budget/set - Set new budget
GET /api/{userid}/expenses/budget/get - Get user budgets
```

### Expense Management
```
GET /api/{userid}/expenses/ - Get all expenses (with optional date filtering)
POST /api/{userid}/expenses/add - Add new expense
PUT /api/{userid}/expenses/update - Update existing expense
DELETE /api/{userid}/expenses/delete/{expenseid} - Delete expense
GET /api/{userid}/expenses/{expenseid} - Get specific expense details
GET /api/{userid}/expenses/essential - Get essential expenses summary
GET /api/{userid}/expenses/luxury - Get luxury expenses summary
```

### Earnings Management
```
GET /api/{userid}/earnings/ - Get all earnings (with optional date filtering)
POST /api/{userid}/earnings/add - Add new earning
PUT /api/{userid}/earnings/update - Update existing earning
DELETE /api/{userid}/earnings/delete/{earningid} - Delete earning
GET /api/{userid}/earnings/{earningid} - Get specific earning details
```

### Dashboard & Investment Features
```
GET /api/{userid}/dashboard/ - Get dashboard summary
GET /api/{userid}/invest/stock/list - Get stock list (Premium)
GET /api/{userid}/invest/stock/{companyName} - Get specific stock info (Premium)
GET /api/{userid}/invest/stock/company/{companyName} - Get detailed company info (Premium)
```

## Technical Stack
- Spring Boot
- Spring Security with custom authentication
- Spring Data JPA
- Hibernate ORM
- BCrypt Password Encoder
- RESTful API Architecture
- Lombok for reduced boilerplate
- Financial Modeling Prep API integration
- Custom exception handling

## Getting Started

1. Clone the repository
2. Configure database settings in `application.properties`
3. Set up Financial Modeling Prep API key
4. Run the Spring Boot application
5. Access the API endpoints using appropriate authentication

## Security Notes
- All endpoints except registration require authentication
- User-specific endpoints require matching user ID with principal
- Premium features require PREMIUM_USER or ADMIN role
- Passwords are encrypted using BCrypt
- Email validation ensures proper format and uniqueness
- Role-based access control is strictly enforced
- CSRF protection disabled
- Secure session management
