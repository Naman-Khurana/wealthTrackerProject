package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.dao.EarningsRepository;
import com.springbootproject.wealthtracker.dto.*;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;
import com.springbootproject.wealthtracker.error.InvalidCategoryException;
import com.springbootproject.wealthtracker.error.InvalidInputValueException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class EarningsServiceImpl implements EarningsService{


    AccountHolderRepository accountHolderRepository;
    EarningsRepository earningsRepository;
    CategoryService categoryService;

    @Autowired
    public EarningsServiceImpl(AccountHolderRepository accountHolderRepository, EarningsRepository earningsRepository, CategoryService categoryService) {
        this.accountHolderRepository = accountHolderRepository;
        this.earningsRepository = earningsRepository;
        this.categoryService = categoryService;
    }

    @Override
    @Transactional
    public void addNewEarningsToUserUsingId(int userid, ExpensesNEarningsInputDTO newEarnings) {
        //get the account holder
        AccountHolder tempAccountHolder = accountHolderRepository.findAccountNEarnings(userid);
        if (tempAccountHolder == null) {
            throw new RuntimeException("User with ID " + userid + " not found.");
        }
        //add new expense to accont
        Earnings tempEarnings=this.convertInputToEarning(newEarnings);
        tempAccountHolder.add(tempEarnings);
        //save the account holder
        accountHolderRepository.save(tempAccountHolder);
        System.out.println("Saved New Earnings to the user");
    }


    @Override
    public EarningsHomeDataDTO getEarningsHomeData(int userid, LocalDate startDate, LocalDate endDate) {

        AccountHolder tempAccount=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND !!"));
        List<Earnings> userEarnings;

        System.out.println("USING NEW FUNCTIONS BROOOO");
        //retrieve accout expenses
        if(startDate ==null && endDate==null){
            userEarnings=accountHolderRepository.findEarningsListOnly(tempAccount);
        }
        else{
            userEarnings=earningsRepository.findEarningsListByDateRange(tempAccount,startDate,endDate);
        }
        double totalEarnings=0;
//        find sum of expenses
        for(Earnings ele: userEarnings){
            totalEarnings+=ele.getAmount();
        }
        //create list of custom expense list
        List<FilteredExpenseOrEarningInfoDTO> customlist=new ArrayList<>();
        //create customExpenselist Object for each element of the user expense list
        for(Earnings ele: userEarnings){
            FilteredExpenseOrEarningInfoDTO tempcustomElement=new FilteredExpenseOrEarningInfoDTO();
            tempcustomElement.setAmount(ele.getAmount());
            tempcustomElement.setDate(ele.getDate());
            tempcustomElement.setCategory(ele.getCategory());
            customlist.add(tempcustomElement);
        }
//        create expenses home data type object
        EarningsHomeDataDTO tempExpensesHomeDataDTO=new EarningsHomeDataDTO(customlist,totalEarnings);
        //return the object
        return tempExpensesHomeDataDTO;


    }

    @Override
    @Transactional
    public ExpenseOrEarningInDetailDTO updateEarningToUser(int userid, Earnings theEarning) throws Exception {
        System.out.println("USING updateEarningToUser in Earnings Services");
        //check if Account Exists
        AccountHolder temp=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));        //check if expense with given id exists

        //update
        try {
            Earnings tempEarnings=earningsRepository.findEarningUsingEarningIdAndAccountHolder(temp,theEarning.getId());
            tempEarnings.setAmount(theEarning.getAmount());
            tempEarnings.setCategory(theEarning.getCategory());
            tempEarnings.setDate(theEarning.getDate());
            tempEarnings.setDescription(theEarning.getDescription());
            earningsRepository.save(tempEarnings);

            //return in required format

            ExpenseOrEarningInDetailDTO tempEle=new ExpenseOrEarningInDetailDTO(tempEarnings.getCategory(),tempEarnings.getDescription(),tempEarnings.getDate(),tempEarnings.getAmount());
            return tempEle;
        }
        catch (Exception e){
            System.out.println("EXPENSE NOT FOUND");
            throw new Exception(e);
        }
        //return in correct format

    }

    @Override
    @Transactional
    public void deleteEarningWithIdFromAccountHolder(int userid, int earningid) throws Exception {

        //get the account holder
        //check if account holder exisits
        AccountHolder temp=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));

        //get the expense
        try {
            Earnings tempEarning=earningsRepository.findEarningUsingEarningIdAndAccountHolder(temp,earningid);
            // delete the expense
            earningsRepository.delete(tempEarning);
        }
        catch (Exception e){
            System.out.println("EARNING NOT FOUND");
            throw new Exception(e);
        }



        System.out.println("DONE !");

    }

    @Override
    public ExpenseOrEarningInDetailDTO getEarningWithIdFromAccountHolderId(int userid, int earningid) throws Exception {
        //check if account is correct
        System.out.println("USING getEarningWithIdFromAccountHolderId in Expense Services");
        AccountHolder temp=accountHolderRepository.findById(userid).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));

        //get the expense
        try {
            Earnings tempEarning=earningsRepository.findEarningUsingEarningIdAndAccountHolder(temp,earningid);
            ExpenseOrEarningInDetailDTO tempEle=new ExpenseOrEarningInDetailDTO(tempEarning.getCategory(),tempEarning.getDescription(),tempEarning.getDate(),tempEarning.getAmount());

            //return in correct format
            return tempEle;
        }
        catch (Exception e){
            System.out.println("Earning NOT FOUND");
            throw new Exception(e);
        }
    }




    @Override
    public Earnings convertInputToEarning(ExpensesNEarningsInputDTO earnings) {
        //create an earnings object
        Earnings tempEarnings= new Earnings();
        tempEarnings.setAmount(earnings.getAmount());
        tempEarnings.setDescription(earnings.getDescription());
        tempEarnings.setDate(earnings.getDate());
        tempEarnings.setCategory(earnings.getCategory());

        return tempEarnings;
        // add the values from input to earnings object

        // return the earnings object
    }


    @Override
    public List<MonthlyEarningsNExpensesDTO> getLastSixMonthsEarnings(int userId) {
        List<Object[]> tempData=earningsRepository.getDynamicMonthlyEarnings(userId);
        List<MonthlyEarningsNExpensesDTO> monthWiseYearlyData=new ArrayList<>();
        for(Object[] obj : tempData){
            int year= Integer.parseInt((String)obj[0]);
            int month=Integer.parseInt((String)obj[1]);
            double total=((BigDecimal)obj[2]).doubleValue();
            MonthlyEarningsNExpensesDTO monthData=new MonthlyEarningsNExpensesDTO(year,month,total);
            monthWiseYearlyData.add(monthData);
        }

        return monthWiseYearlyData;
    }
}
