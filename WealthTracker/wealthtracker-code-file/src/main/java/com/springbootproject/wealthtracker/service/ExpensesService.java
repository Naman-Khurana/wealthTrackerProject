package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dto.ExpenseOrEarningInDetailDTO;
import com.springbootproject.wealthtracker.dto.ExpensesHomeDataDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.entity.Expenses;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

public interface ExpensesService {

    ExpensesHomeDataDTO getExpensesHomeData(int userid, LocalDate startDate, LocalDate endDate);

    void addNewExpenseToUserUsingId(int userid, Expenses newExpense);

    void deleteExpenseWithIdFromAccountHolder(int userid,int expenseid) throws Exception;

    ExpenseOrEarningInDetailDTO getExpenseWithIdFromAccountHolderId(int userid, int expenseid) throws Exception;

    ExpenseOrEarningInDetailDTO updateExpenseToUser(int userid, Expenses theExpense) throws Exception;

    ResponseEntity<Map<String, Object>> getSubCategoryExpensesTotal(int userid, String expenseType);

    double getAnyCategroyExpensesTotal(AccountHolder accountHolder,String budget);
    void validateExpense(Expenses expense);
    public boolean expenseValueValidation(Expenses expenses);
}
