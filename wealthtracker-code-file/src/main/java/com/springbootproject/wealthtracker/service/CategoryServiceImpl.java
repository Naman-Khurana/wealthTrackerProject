package com.springbootproject.wealthtracker.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final List<String> luxuryCategories;
    private final List<String> essentialCategories;

    public CategoryServiceImpl() {
        this.luxuryCategories = new ArrayList<>(Arrays.asList(
                "Entertainment",
                "Dining Out",
                "Vacations",
                "Travel",
                "Personal Care",
                "Technology",
                "Fashion",
                "Gifts"
        ));

        this.essentialCategories = new ArrayList<>(Arrays.asList(
                "Food",
                "Housing",
                "Transportation",
                "Healthcare",
                "Education",
                "Insurance",
                "Savings"
        ));
    }

    public CategoryServiceImpl(List<String> luxuryCategories, List<String> essentialCategories) {
        this.luxuryCategories = luxuryCategories;
        this.essentialCategories = essentialCategories;
    }

    public List<String> getExpensesLuxuryCategories() {
        return new ArrayList<>(luxuryCategories);
    }

    public List<String> getExpensesEssentialCategories() {
        return new ArrayList<>(essentialCategories);
    }

    public List<String> getExpensesCategoriesListSubCategorized(String expenseType) {
        if ("Luxury".equalsIgnoreCase(expenseType)) {
            return getExpensesLuxuryCategories();
        } else {
            return getExpensesEssentialCategories();
        }
    }
    public String getParentCategory(String category){
        List<String> luxury= getExpensesLuxuryCategories();
        if(luxury.contains(category)){
            return "Luxury";
        }
        else{
            return "Essential";
        }
    }

    public boolean categoryValidation(String category){
        if(luxuryCategories.contains(category) || essentialCategories.contains(category))
            return true;
        return false;
    }

    public List<String> getAllParentCategories(){
        List<String> parentCat=List.of("Luxury", "Essential");
        return parentCat;
    }


}
