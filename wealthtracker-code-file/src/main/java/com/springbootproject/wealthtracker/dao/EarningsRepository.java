package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.Earnings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EarningsRepository extends JpaRepository<Earnings,Integer>,EarningsCustomRepository{

    // Step 1: Create a temporary table (CTE) named 'months' using WITH RECURSIVE.
    // It will generate one row for each of the past 6 months,
    // each having the format 'yyyy-mm-01' (first day of the month).

    // Step 2: Convert the current date to 'yyyy-mm-01' format and then recursively
    // subtract one month at a time until 6 months (including the current) are generated.

    // Step 3: From this 'months' table, extract three fields for display:
    // - year (from month_date)
    // - month (from month_date)
    // - total earnings (from the earnings table, summed month-wise).

    // Step 4: LEFT JOIN the 'months' table with the 'earnings' table,
    // matching rows where the year and month of the earning date match the month_date,
    // and only for the specified user ID.

    // Step 5: Group the result by month_date so that for each of the past 6 months,
    // we either get the total earnings or 0 (if no data exists for that month),
    // ensuring all months are present in the output even if there are no earnings.

    // This query is useful to show month-wise earnings trend,
    // even when some months have no data — they still appear with a total of 0.
    //
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
    LEFT JOIN earnings e 
        ON DATE_FORMAT(e.date, '%Y-%m') = DATE_FORMAT(m.month_date, '%Y-%m')
        AND e.account_holder_id = :userId
    GROUP BY m.month_date
    ORDER BY m.month_date
""", nativeQuery = true)

    List<Object[]> getDynamicMonthlyEarnings(@Param("userId") long userId);

}
