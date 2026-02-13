package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.customDataType.BudgetRangeCategoryType;
import com.springbootproject.wealthtracker.dto.BudgetInputDTO;
import com.springbootproject.wealthtracker.dto.BudgetUsageResponseDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BudgetService {
    void setUserBudget(int userid, BudgetInputDTO budget);



    List<Budget> getUserBudget(int userid);

    Optional<Budget> getAnyBudgetConstraint(AccountHolder accountHolder, String Category, LocalDate startDate,LocalDate endDate);



    void checkBudgetDateRange(LocalDate startDate, LocalDate endDate);


    public void manageConflictingBudget(AccountHolder accountHolder,String category,LocalDate startDate);
    public void checkAllBudgetConstraints(AccountHolder accountHolder, String category);
    public boolean checkCategoryBudgetConstraintSatisfaction(AccountHolder accountHolder, Budget budget, String category);

    public BudgetUsageResponseDTO getPercentageExpensesBudgetUsedByCategory(int userid, BudgetRangeCategoryType budgetRangeCategory, String expenseCategory);

    public Map<String,BudgetUsageResponseDTO> getPercentageExpenseBudgetUsedbyAllCategoriesForRangeCategory(int userid, BudgetRangeCategoryType budgetRangeCategory);
}
