package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.dto.BudgetInputDTO;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/{userid}/expenses/budget")
@PreAuthorize("#userid.toString() == principal.username")
public class BudgetController {

    BudgetService budgetService;

    @Autowired
    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping("/set")
    public ResponseEntity<String> setBudget(@PathVariable("userid") int userid, @RequestBody BudgetInputDTO budget){
        System.out.println("Adding Budget for User ID : " + userid);
        budgetService.setUserBudget(userid,budget);

        System.out.println("DONE !!");
        return ResponseEntity.ok("BUDGET : " + budget + "ADDED TO USER WITH ID : " + userid);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Map<String, Object>>> getBudget(@PathVariable("userid") int userid){
        List<Budget> listOfBudgets=budgetService.getUserBudget(userid);
        if(listOfBudgets.isEmpty())
            return ResponseEntity.noContent().build();
        //create response entity
        List<Map<String,Object>> listOfResponse=new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        int i=1;
        for(Budget ele: listOfBudgets){
            response.put("Budget",i++);
            response.put("Category", ele.getCategory());

            response.put("Start Date",ele.getStartDate());
            response.put("End Date",ele.getEndDate());
            response.put("Limit",ele.getAmount());
            listOfResponse.add(response);
        }

        return ResponseEntity.ok(listOfResponse);

    }
}
