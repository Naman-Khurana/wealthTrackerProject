package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.dto.DashBoardHomeDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashBoardServiceImplementation implements DashBoardService {

    private AccountHolderRepository accountHolderRepository;


    @Autowired
    public DashBoardServiceImplementation(AccountHolderRepository accountHolderRepository) {
        this.accountHolderRepository = accountHolderRepository;
        }

    @Override
    public DashBoardHomeDTO getDashBoardData(int userId) {
        //get the account
        AccountHolder accountHolder=accountHolderRepository.findAccountNExpenses(userId);
        AccountHolder accountHolder2=accountHolderRepository.findAccountNEarnings(userId);
        if (accountHolder == null) {
            throw new RuntimeException("Account Holder not found for ID: " + userId);
        }
        //get the associated expenses and earnings
        System.out.println(accountHolder.getRoles());

        List<Expenses> expensesList=accountHolder.getExpenses();

        List<Earnings> earningsList=accountHolder2.getEarnings();

        //find sum of expenses and earning resp
        //expenses
        int totalExpense=0;
        for(Expenses ele : expensesList){
            totalExpense+=ele.getAmount();
        }

        //earnings
        int totalEarnings=0;
        for(Earnings ele : earningsList){
            totalEarnings+=ele.getAmount();
        }
        //add them to dashbaorddata object
        DashBoardHomeDTO display1=new DashBoardHomeDTO(accountHolder.getFirstName(),totalExpense,totalEarnings);
        //return the object
        return display1;

    }
}
