package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;

import java.util.List;

public interface AccountHolderCustomRepository {
    AccountHolder findAccountNExpenses(int theId);
    AccountHolder findAccountNEarnings(int theId);
    List<Expenses> findExpensesListOnly(AccountHolder accountHolder);

    List<Earnings> findEarningsListOnly(AccountHolder accountHolder);

}
