package com.springbootproject.wealthtracker.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class CategoryService {

    private final List<String> luxuryCategories;
    private final List<String> essentialCategories;

    public CategoryService() {
        this.luxuryCategories = new ArrayList<>(Arrays.asList(
                "Entertainment",
                "Dining Out",
                "Vacations/Travel",
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

    public List<String> getLuxuryCategories() {
        return new ArrayList<>(luxuryCategories);
    }

    public List<String> getEssentialCategories() {
        return new ArrayList<>(essentialCategories);
    }

    public List<String> getExpensesCategoriesListSubCategorized(String expenseType) {
        if ("Luxury".equalsIgnoreCase(expenseType)) {
            return getLuxuryCategories();
        } else {
            return getEssentialCategories();
        }
    }
    public String getParentCategory(String category){
        List<String> luxury=getLuxuryCategories();
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
