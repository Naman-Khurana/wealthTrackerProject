package com.springbootproject.wealthtracker.restcontroller;


import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.ExpensesCategoryWithPercentageUsageDTO;
import com.springbootproject.wealthtracker.service.CategoryService;
import com.springbootproject.wealthtracker.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
//@PreAuthorize("hasRole('USER')")
@RequestMapping("/api/category")
public class CategoryController {

    private CategoryService categoryService;
    private JWTUtil jwtUtil;
    private ExpensesService expensesService;


    @Autowired
    public CategoryController(CategoryService categoryService, JWTUtil jwtUtil, ExpensesService expensesService) {
        this.categoryService = categoryService;
        this.jwtUtil = jwtUtil;
        this.expensesService = expensesService;
    }

    @GetMapping("/expenses")
    public ResponseEntity<?> getAllExpensesCategories(){

        List<String> allCategories=new ArrayList<>();
        allCategories.addAll(categoryService.getExpensesEssentialCategories());
        allCategories.addAll(categoryService.getExpensesLuxuryCategories());
        return ResponseEntity.ok(allCategories);
    }

    @GetMapping("/getAllExpensesCategoriesWithPercentageWiseUsage")
    public ResponseEntity<?> getAllExpensesCategoriesWithPercentageWiseUsage(
            @CookieValue(name = "jwt", required = false) String token){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        List<ExpensesCategoryWithPercentageUsageDTO> list=expensesService.getExpensesCategoriesPercentageUsageWise(userid);
        return ResponseEntity.ok(list);
    }



}
