package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Expenses;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ExpensesCustomRepository {

    Expenses findExpenseUsingExpenseIdAndAccountHolder(AccountHolder accountHolder, int expenseid) throws Exception;
    List<Expenses> getEssentialExpensesOnly(AccountHolder accountHolder, List<String> subCategories);

    List<Expenses> getAnyCategoryAllExpenses(AccountHolder accountHolder,String category);

    List<Expenses> findExpensesListByDateRange(AccountHolder accountHolder, LocalDate startDate, LocalDate endDate);
}
