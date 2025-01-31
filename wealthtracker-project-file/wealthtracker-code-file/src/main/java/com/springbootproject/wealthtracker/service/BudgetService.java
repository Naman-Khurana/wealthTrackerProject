package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BudgetService {
    void setUserBudget(int userid, Budget budget);



    List<Budget> getUserBudget(int userid);

    Optional<Budget> getAnyBudgetConstraint(AccountHolder accountHolder, String Category, LocalDate startDate,LocalDate endDate);

    void validateBudget(Budget budget,int userid);

    void checkBudgetDateRange(LocalDate startDate, LocalDate endDate);

    void checkBudgetCategory(String category);
    public void manageConflictingBudget(AccountHolder accountHolder,String category,LocalDate startDate);



}
