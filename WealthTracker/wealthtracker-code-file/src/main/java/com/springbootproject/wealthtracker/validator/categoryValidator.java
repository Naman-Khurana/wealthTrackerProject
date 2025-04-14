package com.springbootproject.wealthtracker.validator;

import com.springbootproject.wealthtracker.service.CategoryService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class categoryValidator implements ConstraintValidator<CategoryValidation,String> {

    private CategoryService categoryService;

    public categoryValidator(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public boolean isValid(String category, ConstraintValidatorContext constraintValidatorContext) {
        if(category==null){
            return true;
            //notblank will handle this
        }
        boolean exists=categoryService.categoryValidation(category);
        if(!exists){
           return false;
        }

        return true;
    }
}
