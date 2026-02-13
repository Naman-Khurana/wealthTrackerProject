package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.ExpenseOrEarningInDetailDTO;
import com.springbootproject.wealthtracker.dto.ExpensesHomeDataDTO;
import com.springbootproject.wealthtracker.dto.ExpensesNEarningsInputDTO;
import com.springbootproject.wealthtracker.dto.MonthlyEarningsNExpensesDTO;
import com.springbootproject.wealthtracker.entity.Expenses;
import com.springbootproject.wealthtracker.service.ExpensesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@Validated
public class ExpensesController {
    //add expensesController injection
    private ExpensesService expensesService;
    private JWTUtil jwtUtil;


    //constructor injection

    @Autowired
    public ExpensesController(JWTUtil jwtUtil, ExpensesService expensesService) {
        this.jwtUtil = jwtUtil;
        this.expensesService = expensesService;
    }



    @GetMapping("/")
    public ExpensesHomeDataDTO expensesHome(@CookieValue(name = "jwt", required = false) String token,
                                            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd") LocalDate startDate,
                                            @RequestParam(required = false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd")LocalDate endDate) {

        ExpensesHomeDataDTO tempExpensesHomeData;
        //check if date are given as parameters for filtering
        //if no such param search for all
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        //if param exists get results accordingly
        if(startDate==null || endDate==null){
            tempExpensesHomeData=expensesService.getExpensesHomeData(userid,null,null);
        }

        else{
            tempExpensesHomeData =expensesService.getExpensesHomeData(userid,startDate,endDate);
        }
        //return the required data
        return tempExpensesHomeData;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUserNewExpense(@Valid @RequestBody ExpensesNEarningsInputDTO expenses,@CookieValue(name = "jwt", required = false) String token) {

        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        //call the add new expense service

        System.out.println("Adding new Expense : " + expenses + " to User ID : " + userid);
        expensesService.addNewExpenseToUserUsingId(userid, expenses);
        System.out.println("New expense added.");
        return ResponseEntity.ok("User updated successfully");

    }

    @PutMapping("/update")
    public ExpenseOrEarningInDetailDTO updateUserExpense(@RequestBody Expenses expenses, @CookieValue(name = "jwt", required = false) String token) throws Exception {
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        //call the add new expense service

        System.out.println("Updating : " + expenses + " to User ID : " + userid);
        ExpenseOrEarningInDetailDTO ans= expensesService.updateExpenseToUser(userid,expenses);
        System.out.println(" Expense Updated.");
        return ans;

    }


    @DeleteMapping("/delete/{expenseid}")
    public ResponseEntity<String> deleteExpenseWithExpenseIdAndAccountHolderId(@CookieValue(name = "jwt", required = false) String token, @PathVariable("expenseid") int expenseid) throws Exception {
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        System.out.println("Removing Expense id : " + expenseid + " from user id : " + userid);

        //call service function for deletion
        System.out.println("DELETING EXPENSE WITH ID : " + expenseid);
        System.out.println("FROM ACCOUNT HOLDER " + userid);
        expensesService.deleteExpenseWithIdFromAccountHolder(userid, expenseid);
        System.out.println("EXPENSE DELETED.");

        //return response untity
        return ResponseEntity.ok("User updated   successfully");

    }

    @GetMapping("/{expenseid}")
    //call service function for updating expense
    public ExpenseOrEarningInDetailDTO getExpenseFromAccountHolderId(@CookieValue(name = "jwt", required = false) String token , @PathVariable("expenseid") int expenseid) throws Exception{
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        ExpenseOrEarningInDetailDTO tempExpense= expensesService.getExpenseWithIdFromAccountHolderId(userid,expenseid);

        //return the updated expense
        return tempExpense;
    }


    //get total expenditure on essential expenses
    @GetMapping("/essential")
    public ResponseEntity<?> getUserEssentialExpenditure(@CookieValue(name = "jwt", required = false) String token ){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        return ResponseEntity.ok(expensesService.getSubCategoryExpensesTotal(userid,"essential"));


    }

    @GetMapping("/luxury")
    public ResponseEntity<?> getUserLuxuryExpenditure(@CookieValue(name = "jwt", required = false) String token){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        return ResponseEntity.ok(expensesService.getSubCategoryExpensesTotal(userid,"luxury"));

    }


    @GetMapping("/lastSixMonthsData")
    public ResponseEntity<?> getTestingDone(@CookieValue(name = "jwt", required = false) String token ){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        List<MonthlyEarningsNExpensesDTO> results=expensesService.getMonthWiseExpenses(userid);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/recentExpenses")
    public ResponseEntity<?> getRecentNTransactions(@CookieValue(name = "jwt", required = false) String token,@RequestParam(required = true) Integer n){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        return ResponseEntity.ok(expensesService.getRecentNTranscations(userid,n));
    }

}


