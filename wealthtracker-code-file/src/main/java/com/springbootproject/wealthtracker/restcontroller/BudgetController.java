package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.customDataType.BudgetRangeCategoryType;
import com.springbootproject.wealthtracker.dto.BudgetInputDTO;
import com.springbootproject.wealthtracker.dto.BudgetUsageResponseDTO;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/expenses/budget")
public class BudgetController {

    private BudgetService budgetService;
    private JWTUtil jwtUtil;

    @Autowired
    public BudgetController(BudgetService budgetService, JWTUtil jwtUtil) {
        this.budgetService = budgetService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/set")
    public ResponseEntity<String> setBudget(@CookieValue(name = "jwt", required = false) String token, @RequestBody BudgetInputDTO budget){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        System.out.println("Adding Budget for User ID : " + userid);

        budgetService.setUserBudget(userid,budget);

        System.out.println("DONE !!");
        return ResponseEntity.ok("BUDGET : " + budget + "ADDED TO USER WITH ID : " + userid);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Map<String, Object>>> getBudget(@CookieValue(name = "jwt", required = false) String token){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);

        List<Budget> listOfBudgets=budgetService.getUserBudget(userid);
        if(listOfBudgets.isEmpty())
            return ResponseEntity.noContent().build();
        //create response entity
        List<Map<String,Object>> listOfResponse=new ArrayList<>();

        int i=1;
        for(Budget ele: listOfBudgets){
            Map<String, Object> response = new HashMap<>();
            response.put("budget",i++);
            response.put("category", ele.getCategory());

            response.put("startDate",ele.getStartDate());
            response.put("endDate",ele.getEndDate());
            response.put("limit",ele.getAmount());
            listOfResponse.add(response);
        }

        return ResponseEntity.ok(listOfResponse);

    }

    @GetMapping("/percentageBudgetUsed")
    public ResponseEntity<?> getPercentageBudgetUsed(@CookieValue(name = "jwt", required = false) String token,
                                                     @RequestParam(required = true) BudgetRangeCategoryType budgetRangeCategory,
                                                     @RequestParam(required = true) String expenseCategory){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);

        BudgetUsageResponseDTO percentageBudgetUsed=budgetService.getPercentageExpensesBudgetUsedByCategory(userid,budgetRangeCategory,expenseCategory);
        return ResponseEntity.ok(percentageBudgetUsed);

    }


    @GetMapping("/percentageAllCategoriesBudgetUsedBudgetRangeCategoryWise")
    public ResponseEntity<?> getPercentageAllCategoriesBudgetUsed(@CookieValue(name = "jwt", required = false) String token,
                                                                  @RequestParam(required = true) BudgetRangeCategoryType budgetRangeCategory
                                                                  ){

        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);

        Map<String,BudgetUsageResponseDTO> result =budgetService.getPercentageExpenseBudgetUsedbyAllCategoriesForRangeCategory(userid,budgetRangeCategory);


        return ResponseEntity.ok(result);
    }

}
