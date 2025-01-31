package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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


}
