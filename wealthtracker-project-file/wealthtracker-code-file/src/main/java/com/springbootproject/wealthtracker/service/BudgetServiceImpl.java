package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
//import com.springbootproject.wealthtracker.dao.BudgetCustomRespository;
import com.springbootproject.wealthtracker.dao.BudgetRepository;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.error.InvalidCategoryException;
import com.springbootproject.wealthtracker.error.InvalidDateRangeException;
import com.springbootproject.wealthtracker.error.NotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BudgetServiceImpl implements BudgetService{
    AccountHolderRepository accountHolderRepository;
    BudgetRepository budgetRepository;

    CategoryService categoryService;

    @Autowired
    public BudgetServiceImpl(AccountHolderRepository accountHolderRepository, BudgetRepository budgetRepository, CategoryService categoryService) {
        this.accountHolderRepository = accountHolderRepository;
        this.budgetRepository = budgetRepository;
        this.categoryService = categoryService;
    }

    @Override
    @Transactional
    public void setUserBudget(int userid, Budget budget) {
        //get account holder
        AccountHolder tempAccountHolder=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER ID NOT FOUND "));
        //associate budget with account holder
        tempAccountHolder.add(budget);
        accountHolderRepository.save(tempAccountHolder);

    }

    @Override
    public List<Budget> getUserBudget(int userid) {
        // get account holder
        AccountHolder tempAccountHolder=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER ID NOT FOUND "));
        //retrieve account holder budget
        List<Budget> tempBudget=tempAccountHolder.getBudgets();
        //return budget element
        return tempBudget;
    }


    @Override
    public Optional<Budget> getAnyBudgetConstraint(AccountHolder accountHolder, String category, LocalDate startDate,LocalDate endDate) {
        Optional<Budget> tempBudget;
        if(startDate==null || endDate ==null){
            System.out.println("Started getAnyBudgetConstraint");
            tempBudget=budgetRepository.findBudgetByAccountHolderAndCategory(accountHolder,category);
            System.out.println("Budget is returned ");
        }
        else{
            System.out.println("Started findBudgetByAccountHolderAndCategoryAndDateRange");
            tempBudget=budgetRepository.findBudgetByAccountHolderAndCategoryAndDateRange(accountHolder,category,startDate,endDate);
            System.out.println("Budget is returned ");
            System.out.println(tempBudget);
        }
        if(tempBudget.isPresent()){
            System.out.println("Budget is returned ");
            return tempBudget;
        }
        return null;
    }

    @Override
    public void validateBudget(Budget budget,int userid) {
        System.out.println(budget);
        AccountHolder tempAccountHolder=accountHolderRepository.findById(userid).get();
        manageConflictingBudget(tempAccountHolder,budget.getCategory(),budget.getStartDate());
        checkBudgetCategory(budget.getCategory());
        checkBudgetDateRange(budget.getStartDate(),budget.getEndDate());


    }

    @Override
    public void checkBudgetDateRange(LocalDate startDate, LocalDate endDate) {
        if(startDate.isAfter(endDate))
            throw new InvalidDateRangeException("Start Date of the budget can't be after the End date of the Budget!");

    }

    @Override
    public void checkBudgetCategory(String category) {
        if(categoryService.getLuxuryCategories().contains(category) || categoryService.getEssentialCategories().contains(category) ||
                category.equals("Total Expenses") || categoryService.getAllParentCategories().contains(category))
            return;
        throw new InvalidCategoryException("Invalid Category provided. Allowed Categories are" +
                " :  " + " \nESSENTIALS : " +  categoryService.getEssentialCategories() + " \n LUXURY :" +  categoryService.getLuxuryCategories());
    }

    @Override
    @Transactional
    public void manageConflictingBudget(AccountHolder accountHolder,String category,LocalDate startDate) {
        System.out.println("Running Conflict BUdget Function"+accountHolder+category+startDate);
        Optional<Budget> tempBudget=budgetRepository.findBudgetByAccountHolderAndCategoryAndStartDate(accountHolder,category,startDate);
        System.out.println(tempBudget);
        if (tempBudget.isPresent()) {

            Budget existingBudget = budgetRepository.findById(tempBudget.get().getId()).orElse(null);
            if (existingBudget != null) {
                budgetRepository.delete(existingBudget);
                System.out.println("CONFLICT BUDGET DELETED.");
            }
        }else
            System.out.println("NO CONFLICTING BUDGET FOUND");

    }
}
