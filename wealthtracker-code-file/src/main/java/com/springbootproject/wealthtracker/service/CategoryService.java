package com.springbootproject.wealthtracker.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public interface CategoryService {

    public List<String> getExpensesLuxuryCategories();
    public List<String> getExpensesEssentialCategories();
    public List<String> getExpensesCategoriesListSubCategorized(String expenseType);
    public String getParentCategory(String category);
    public boolean categoryValidation(String category);
    public List<String> getAllParentCategories();
}
