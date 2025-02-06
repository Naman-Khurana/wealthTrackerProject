package com.springbootproject.wealthtracker.service;
import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.dao.ExpensesRepository;
import com.springbootproject.wealthtracker.dto.ExpenseOrEarningInDetailDTO;
import com.springbootproject.wealthtracker.dto.FilteredExpenseOrEarningInfoDTO;
import com.springbootproject.wealthtracker.dto.ExpensesHomeDataDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.entity.Expenses;
import com.springbootproject.wealthtracker.error.InvalidCategoryException;
import com.springbootproject.wealthtracker.error.InvalidInputValueException;
import com.springbootproject.wealthtracker.error.NotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;


@Service
public class ExpensesServiceImpl implements ExpensesService{

    private AccountHolderRepository accountHolderRepository;
    private ExpensesRepository expensesRepository;

    private BudgetService budgetService;
    private CategoryService categoryService;

    //constructor
    @Autowired
    public ExpensesServiceImpl(AccountHolderRepository accountHolderRepository,
                               ExpensesRepository expensesRepository, BudgetService budgetService, CategoryService categoryService) {
        this.accountHolderRepository = accountHolderRepository;
        this.expensesRepository = expensesRepository;
        this.budgetService = budgetService;
        this.categoryService = categoryService;

    }

    @Override
    public ExpensesHomeDataDTO getExpensesHomeData(int userid,LocalDate startDate,LocalDate endDate) {
        //get account
        AccountHolder tempAccountHolder=accountHolderRepository.findById(userid).orElseThrow(() -> new NotFoundException("USER NOT FOUND !!"));
        List<Expenses> userExpenses;
        Optional<Budget> totalBudgetConstraint;
        //retrieve accout expenses
        //if start date or end date are null
        //for now date range works only if both starting and ending date are inputted
        if(startDate ==null || endDate==null){
            userExpenses=expensesRepository.findByAccountHolder(tempAccountHolder);
            totalBudgetConstraint=Optional.empty();

        }
        else {
            userExpenses=expensesRepository.findExpensesListByDateRange(tempAccountHolder,startDate,endDate);
            totalBudgetConstraint=budgetService.getAnyBudgetConstraint(tempAccountHolder,"Total Expenses",startDate,endDate);
        }
        double totalExpenses=0;
//        find sum of expenses
        for(Expenses ele: userExpenses){
            totalExpenses+=ele.getAmount();
        }
        //create list of custom expense list
        List<FilteredExpenseOrEarningInfoDTO> customlist=new ArrayList<>();
        //create customExpenselist Object for each element of the user expense list
        for(Expenses ele: userExpenses){
            FilteredExpenseOrEarningInfoDTO tempcustomElement=new FilteredExpenseOrEarningInfoDTO();
            tempcustomElement.setAmount(ele.getAmount());
            tempcustomElement.setDate(ele.getDate());
            tempcustomElement.setCategory(ele.getCategory());
            customlist.add(tempcustomElement);
        }

//        create expenses home data type object

        ExpensesHomeDataDTO tempExpensesHomeDataDTO=new ExpensesHomeDataDTO(customlist,totalExpenses);

        //CHECK FOR BUDGET CONSTRAINT CHECK

//
        if(totalBudgetConstraint.isPresent()) {
            System.out.println("BUDGET AT IF POINT IS : "+ totalBudgetConstraint);
            System.out.println("Change is : " + new Budget(totalBudgetConstraint));
            Budget tempTotalBudget=totalBudgetConstraint.get();
            boolean result=budgetService.checkCategoryBudgetConstraintSatisfaction(tempAccountHolder,tempTotalBudget, "Total Expenses");
            //if constraint voilation add it

            if(result==false)
                tempExpensesHomeDataDTO.setTotalBudgetConstraintVoilation("You Went Over Budget!!!! Please be mindful of your expenses.");

        }





        //return the object
        return tempExpensesHomeDataDTO;
    }




    @Override
    @Transactional
    public void addNewExpenseToUserUsingId(int userid, Expenses newExpense) {
        //get the account holder
        AccountHolder tempAccountHolder = accountHolderRepository.findAccountNExpenses(userid);
        if (tempAccountHolder == null) {
            throw new NotFoundException("User with ID " + userid + " not found.");
        }
        //add new expense to accont
        tempAccountHolder.add(newExpense);
        //save the account holder
        accountHolderRepository.save(tempAccountHolder);
        //check for budget constraint
        //first global
        budgetService.checkAllBudgetConstraints(tempAccountHolder, newExpense.getCategory());

        System.out.println("Saved the user");
    }

    @Override
    @Transactional
    public void deleteExpenseWithIdFromAccountHolder(int userid, int expenseid) throws Exception {

        //get the account holder
        //check if account holder exisits
        AccountHolder temp=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));

        //get the expense
        try {
            Expenses tempExpense=expensesRepository.findExpenseUsingExpenseIdAndAccountHolder(temp,expenseid);
            // delete the expense
            expensesRepository.delete(tempExpense);
        }
        catch (Exception e){
            System.out.println("EXPENSE NOT FOUND");
            throw new Exception(e);
        }



        System.out.println("DONE !");

    }

    @Override
    public ExpenseOrEarningInDetailDTO getExpenseWithIdFromAccountHolderId(int userid, int expenseid) throws Exception {
        //check if account is correct
        System.out.println("USING getExpenseWithIdFromAccountHolderId in Expense Services");
        AccountHolder temp=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));

        //get the expense
        try {
            Expenses tempExpense=expensesRepository.findExpenseUsingExpenseIdAndAccountHolder(temp,expenseid);
            ExpenseOrEarningInDetailDTO tempEle=new ExpenseOrEarningInDetailDTO(tempExpense.getCategory(),tempExpense.getDescription(),tempExpense.getDate(),tempExpense.getAmount());

            //return in correct format
            return tempEle;
        }
        catch (Exception e){
            System.out.println("EXPENSE NOT FOUND");
            throw new Exception(e);
        }

    }

    @Override
    @Transactional
    public ExpenseOrEarningInDetailDTO updateExpenseToUser(int userid, Expenses theExpense) throws Exception {
        System.out.println("USING updateExpenseToUser in Expenses Services");
        //check if Account Exists
        AccountHolder temp=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));        //check if expense with given id exists

        //update
        try {
            Expenses tempExpense=expensesRepository.findExpenseUsingExpenseIdAndAccountHolder(temp,theExpense.getId());
            tempExpense.setAmount(theExpense.getAmount());
            tempExpense.setCategory(theExpense.getCategory());
            tempExpense.setDate(theExpense.getDate());
            tempExpense.setDescription(theExpense.getDescription());
            expensesRepository.save(tempExpense);

            //return in required format

            ExpenseOrEarningInDetailDTO tempEle=new ExpenseOrEarningInDetailDTO(tempExpense.getCategory(),tempExpense.getDescription(),tempExpense.getDate(),tempExpense.getAmount());
            return tempEle;
        }
        catch (Exception e){
            System.out.println("EXPENSE NOT FOUND");
            throw new Exception(e);
        }
 //return in correct format

    }

    @Override
    public double getAnyCategroyExpensesTotal(AccountHolder accountHolder,String category){
        List<Expenses> categoryExpenses=expensesRepository.getAnyCategoryAllExpenses(accountHolder,category);
        double totalExpenses=0;
        for(Expenses ele:categoryExpenses){
            totalExpenses+=ele.getAmount();
        }
        return totalExpenses;
    }




    @Override
    public ResponseEntity<Map<String,Object>> getSubCategoryExpensesTotal(int userid, String expenseType) {
        //get account holder
        AccountHolder tempAccountHolder=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));
        //get categories of expenseType expenses
        List<String> subCategories=categoryService.getExpensesCategoriesListSubCategorized(expenseType);

        //get list of expenses
        List<Expenses> Expenses=expensesRepository.getEssentialExpensesOnly(tempAccountHolder,subCategories);
        int totalExpense=0;
        List<FilteredExpenseOrEarningInfoDTO> customlist=new ArrayList<>();

        //create object for each element to be returned
        for(Expenses ele : Expenses){
            totalExpense+=ele.getAmount();
            FilteredExpenseOrEarningInfoDTO tempcustomElement=new FilteredExpenseOrEarningInfoDTO();
            tempcustomElement.setAmount(ele.getAmount());
            tempcustomElement.setDate(ele.getDate());
            tempcustomElement.setCategory(ele.getCategory());
            customlist.add(tempcustomElement);
        }

        //create response entity
        Map<String, Object> response = new HashMap<>();

        response.put(expenseType +" Categories",subCategories);
        response.put(expenseType + " Expenses", customlist);
        response.put("Total "+expenseType +" Expenses" , totalExpense);

        //return response
        return ResponseEntity.ok(response);

    }


    @Override
    public void validateExpense(Expenses expense) {
        if(categoryService.categoryValidation(expense.getCategory())==false)
            throw new InvalidCategoryException("Invalid Category provided. Allowed Categories are" +
                    " :  " + " \nESSENTIALS : " +  categoryService.getEssentialCategories() + " \n LUXURY :" +  categoryService.getLuxuryCategories());
        if(!expenseValueValidation(expense))
            throw new InvalidInputValueException("Value of an Expense Can't be less than '0'.");
    }

    @Override
    public boolean expenseValueValidation(Expenses expenses){
        if(expenses.getAmount()<0)
            return false;
        return true;

    }
}
