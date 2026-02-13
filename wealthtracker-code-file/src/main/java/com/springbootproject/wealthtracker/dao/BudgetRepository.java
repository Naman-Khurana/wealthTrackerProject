package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.customDataType.BudgetRangeCategoryType;
import com.springbootproject.wealthtracker.dto.BudgetUsageResponseDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget,Integer>{

    @Query("SELECT b FROM Budget b WHERE b.accountHolder = :accountHolder AND b.category = :category")
    Optional<Budget> findBudgetByAccountHolderAndCategory(
            @Param("accountHolder") AccountHolder accountHolder,
            @Param("category") String category);


    @Query("SELECT b FROM Budget b WHERE b.accountHolder = :accountHolder AND b.category = :category AND b.startDate <= :startDate AND b.endDate >= :endDate")
    Optional<Budget> findBudgetByAccountHolderAndCategoryAndDateRange(
            @Param("accountHolder") AccountHolder accountHolder,
            @Param("category") String category,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);


    @Query("SELECT b FROM Budget b JOIN FETCH b.accountHolder WHERE b.accountHolder = :accountHolder AND b.category = :category AND :startDate BETWEEN b.startDate AND b.endDate")
    Optional<Budget> findBudgetByAccountHolderAndCategoryAndStartDate(
            @Param("accountHolder") AccountHolder accountHolder,
            @Param("category") String category,
            @Param("startDate") LocalDate startDate);

    @Query("SELECT b from Budget b JOIN FETCH b.accountHolder WHERE b.accountHolder= :accountHolder AND b.category= :category AND CURRENT_DATE BETWEEN b.startDate and b.endDate")
    Optional<Budget> findCurrentBudgetByAccountHolderAndCategory(
            @Param("accountHolder") AccountHolder accountHolder,
            @Param("category") String category
    );

    @Query("SELECT b from Budget b JOIN FETCH b.accountHolder WHERE b.accountHolder= :accountHolder AND b.category= :category AND b.budgetRangeCategory=:budgetRangeCategory AND CURRENT_DATE BETWEEN b.startDate and b.endDate")
    Optional<Budget> findCurrentBudgetByAccountHolderAndCategoryAndRangeCategory(
            @Param("accountHolder") AccountHolder accountHolder,
            @Param("category") String category,
            @Param("budgetRangeCategory")BudgetRangeCategoryType budgetRangeCategoryType
            );

//    @Query("""
//            SELECT c.category, COALESCE(b.amount, -1) as totalBudget
//            FROM (
//            """)
//    List<List<Object>> getPercentageExpenseBudgetUsedbyAllCategoriesForRangeCategory(
//            @Param("accountHolder") AccountHolder accountHolder,
//            @Param("dateRange") BudgetRangeCategoryType budgetRangeCategory
//    );
}
