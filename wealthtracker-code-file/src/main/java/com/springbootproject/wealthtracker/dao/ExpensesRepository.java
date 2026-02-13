package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.customDataType.BudgetRangeCategoryType;
import com.springbootproject.wealthtracker.dto.ExpensesNEarningsInputDTO;
import com.springbootproject.wealthtracker.dto.MonthlyEarningsNExpensesDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Expenses;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpensesRepository extends JpaRepository<Expenses,Integer>,ExpensesCustomRepository {

    List<Expenses> findByAccountHolder(AccountHolder accountHolder);

    @Query("SELECT "+
            "FUNCTION('YEAR', e.date), FUNCTION('MONTH', e.date), CAST(SUM(e.amount) AS double) " +
            "FROM Expenses e " +
            "WHERE e.accountHolder.id = :userId " +
            "GROUP BY FUNCTION('YEAR', e.date), FUNCTION('MONTH', e.date) " +
            "ORDER BY FUNCTION('YEAR', e.date), FUNCTION('MONTH', e.date)")
    List<Object[]> getMonthlyExpenses(@Param("userId") long userId);

    @Query(value = """
    WITH RECURSIVE months AS (
        SELECT DATE_FORMAT(CURDATE(), '%Y-%m-01') AS month_date
        UNION ALL
        SELECT DATE_SUB(month_date, INTERVAL 1 MONTH)
        FROM months
        WHERE month_date > DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
    )
    SELECT 
        DATE_FORMAT(m.month_date, '%Y') AS year,
        DATE_FORMAT(m.month_date, '%m') AS month,
        COALESCE(SUM(e.amount), 0) AS total
    FROM months m
    LEFT JOIN expenses e 
        ON DATE_FORMAT(e.date, '%Y-%m') = DATE_FORMAT(m.month_date, '%Y-%m')
        AND e.account_holder_id = :userId
    GROUP BY m.month_date
    ORDER BY m.month_date
""", nativeQuery = true)
    List<Object[]> getDynamicMonthlyExpenses(@Param("userId") long userId);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expenses e WHERE e.accountHolder.id = :userId AND e.date BETWEEN :startDate AND :endDate")
    Double getTotalExpensesInDateRange(@Param("userId") Long userId,
                                       @Param("startDate") LocalDate startDate,
                                       @Param("endDate") LocalDate endDate);


    @Query(value = "SELECT new com.springbootproject.wealthtracker.dto.ExpensesNEarningsInputDTO(e.amount,e.date,e.category) FROM Expenses e WHERE e.accountHolder.id = :userId ORDER BY e.date DESC " )
    List<ExpensesNEarningsInputDTO> getRecentNTransactions(@Param("userId") Long userId, Pageable pageable);


    @Query("""
            SELECT e.category as category, SUM(e.amount) as totalAmount
            FROM Expenses e WHERE e.accountHolder.id= :userId
            GROUP BY e.category
            """)
    List<Object[]> getExpensescategoriesPercentageUsageWise(@Param("userId") Long userId);

    @Query("""
            Select SUM(e.amount) as totalAmount
            FROM Expenses e WHERE e.accountHolder.id= :userId
            """)
    Double getTotalExpensesByAccountHolderId(long userId);

    @Query("""
            SELECT e.category as category, SUM(e.amount) as totalAmount
            FROM Expenses e WHERE e.accountHolder.id= :userId AND e.date BETWEEN :startDate AND :endDate
            GROUP BY e.category
            """)
    List<Object[]> getAllCategoryWiseExpensesInDateRange(@Param("userId") Long userId,
                                                     @Param("startDate") LocalDate startDate,
                                                     @Param("endDate") LocalDate endDate);




}
