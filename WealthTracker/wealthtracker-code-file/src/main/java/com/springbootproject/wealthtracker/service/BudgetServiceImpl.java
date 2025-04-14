package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
//import com.springbootproject.wealthtracker.dao.BudgetCustomRespository;
import com.springbootproject.wealthtracker.dao.BudgetRepository;
import com.springbootproject.wealthtracker.dao.ExpensesRepository;
import com.springbootproject.wealthtracker.dto.BudgetInputDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.entity.Expenses;
import com.springbootproject.wealthtracker.error.InvalidCategoryException;
import com.springbootproject.wealthtracker.error.InvalidDateRangeException;
import com.springbootproject.wealthtracker.error.NotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BudgetServiceImpl implements BudgetService{
    AccountHolderRepository accountHolderRepository;
    BudgetRepository budgetRepository;
    ExpensesRepository expensesRepository;

    CategoryService categoryService;

    @Autowired
    public BudgetServiceImpl(AccountHolderRepository accountHolderRepository, BudgetRepository budgetRepository, ExpensesRepository expensesRepository, CategoryService categoryService) {
        this.accountHolderRepository = accountHolderRepository;
        this.budgetRepository = budgetRepository;
        this.expensesRepository = expensesRepository;
        this.categoryService = categoryService;
    }



//    NOTE : THE BUDGET CHECKING CATEGORY WISE HAS TO BE CHECKED IF IT WORKS AS INTENDED.
    @Override
    @Transactional
    public void setUserBudget(int userid, BudgetInputDTO budget) {

        AccountHolder tempAccountHolder=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER ID NOT FOUND "));

        Budget tempBudget =new Budget();

        //transfer to budget class

        //manage budget category
        String category=budget.getCategory() == null ? "Total Expenses" : budget.getCategory();
        tempBudget.setCategory(category);

        tempBudget.setAmount(budget.getAmount());

            // ensure start date and end date values
        LocalDate startDate=budget.getStartDate() == null ? LocalDate.now() : budget.getStartDate();
        LocalDate endDate=budget.getEndDate()==null ? startDate.plusMonths(1) : budget.getEndDate();
        checkBudgetDateRange(startDate,endDate);

        //add the date range to budget object to be added to account
        tempBudget.setStartDate(startDate);
        tempBudget.setEndDate(endDate);

        //manage any conflicting date range budget
        manageConflictingBudget(tempAccountHolder, tempBudget.getCategory(),startDate);

        //commit the changes in database to ensure the unique constraint of budget table is not violated
        budgetRepository.flush();

        //save the new budget
        tempAccountHolder.add(tempBudget);
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
        return Optional.empty();
    }



    @Override
    public void checkBudgetDateRange(LocalDate startDate, LocalDate endDate) {
        if(startDate.isAfter(endDate))
            throw new InvalidDateRangeException("Start Date of the budget can't be after the End date of the Budget!");

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


    @Override
    public void checkAllBudgetConstraints(AccountHolder accountHolder, String category) {
        //check for category budgett
        //for now start date and end date is set to null
        Optional<Budget> tempBudget1=getAnyBudgetConstraint(accountHolder,category,null,null);
        if(tempBudget1.isPresent()){

            checkCategoryBudgetConstraintSatisfaction(accountHolder,new Budget(tempBudget1),category);
        }
        //check parent category budget
        Optional<Budget> tempBudget2=getAnyBudgetConstraint(accountHolder,categoryService.getParentCategory(category),null,null);
        if(tempBudget2.isPresent()){
            checkCategoryBudgetConstraintSatisfaction(accountHolder,new Budget(tempBudget2),categoryService.getParentCategory(category));
        }else{
            System.out.println();
        }
        //check Total Expense Budget
        Optional<Budget> tempBudget3=getAnyBudgetConstraint(accountHolder,"Total Expenses",null,null);
        if(tempBudget3.isPresent()){
            checkCategoryBudgetConstraintSatisfaction(accountHolder,new Budget(tempBudget3),"Total Expenses");
        }


    }

    @Override
    public boolean checkCategoryBudgetConstraintSatisfaction(AccountHolder accountHolder, Budget budget, String category) {
        //calculate total expenses in specific category
        List<Expenses> listExpenses=new ArrayList<>();
        if(category=="Essential" || category == "Luxury"){
            System.out.println("RUNNING PARENT CATEGORY EXPENSE CONSTRAINT");
            List<String> subCategories=categoryService.getExpensesCategoriesListSubCategorized(category);
            listExpenses=expensesRepository.getEssentialExpensesOnly(accountHolder,subCategories);

        } else if (category=="Total Expenses") {
            System.out.println("USING TOTAL EXPENSES CONSTRAINT 1");
            listExpenses= accountHolderRepository.findExpensesListOnly(accountHolder);
        } else {
            System.out.println("RUNNING CATEGORY EXPENSES");
            listExpenses=expensesRepository.getEssentialExpensesOnly(accountHolder,new ArrayList<>(List.of(category)));
        }
        double totalExpenses=0;
        for(Expenses ele: listExpenses){
            totalExpenses+=ele.getAmount();
        }
        System.out.println("TOTAL EXPENSE: " + totalExpenses);
        System.out.println("BUDGET =" + budget);
        //check if budget went over board
        if(totalExpenses>budget.getAmount())
            return false;
        //it true then send a notification
        return true;
    }
}
