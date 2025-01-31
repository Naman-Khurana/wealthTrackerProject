package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dao.ExpensesRepository;
import com.springbootproject.wealthtracker.entity.Expenses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsightsServiceImpl implements InsightsService{

    ExpensesService expensesService;
    ExpensesRepository expensesRepository;

    @Autowired
    public InsightsServiceImpl(ExpensesService expensesService, ExpensesRepository expensesRepository) {
        this.expensesService = expensesService;
        this.expensesRepository = expensesRepository;
    }

    @Override
    //INCOMPLETE FUNCTION
    public String getExpenseInsights(int expenseId) {
        //get expense
        Expenses tempExpense=expensesRepository.findById(expenseId).orElseThrow(() -> new RuntimeException("EXPENSE NOT FOUND !"));

        //
        return "NOTHING FOR NOW ";

    }
}
