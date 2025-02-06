package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.dto.ExpenseOrEarningInDetailDTO;
import com.springbootproject.wealthtracker.dto.ExpensesHomeDataDTO;
import com.springbootproject.wealthtracker.entity.Expenses;
import com.springbootproject.wealthtracker.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/{userid}/expenses")
@PreAuthorize("#userid.toString() == principal.username")
public class ExpensesController {
    //add expensesController injection
    private ExpensesService expensesService;


    //constructor injection


    @Autowired
    public ExpensesController(ExpensesService expensesService) {
        this.expensesService = expensesService;

    }

    @GetMapping("/")
    public ExpensesHomeDataDTO expensesHome(@PathVariable("userid") int userid,
                                            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd") LocalDate startDate,
                                            @RequestParam(required = false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd")LocalDate endDate) {

        ExpensesHomeDataDTO tempExpensesHomeData;
        //check if date are given as parameters for filtering
        //if no such param search for all

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
    public ResponseEntity<String> addUserNewExpense(@RequestBody Expenses expenses, @PathVariable("userid") int userid) {
        //call the add new expense service
        expensesService.validateExpense(expenses);
        System.out.println("Adding new Expense : " + expenses + " to User ID : " + userid);
        expensesService.addNewExpenseToUserUsingId(userid, expenses);
        System.out.println("New expense added.");
        return ResponseEntity.ok("User updated successfully");

    }

    @PutMapping("/update")
    public ExpenseOrEarningInDetailDTO updateUserExpense(@RequestBody Expenses expenses, @PathVariable("userid") int userid) throws Exception {
        //call the add new expense service

        System.out.println("Updating : " + expenses + " to User ID : " + userid);
        ExpenseOrEarningInDetailDTO ans= expensesService.updateExpenseToUser(userid,expenses);
        System.out.println(" Expense Updated.");
        return ans;

    }


    @DeleteMapping("/delete/{expenseid}")
    public ResponseEntity<String> deleteExpenseWithExpenseIdAndAccountHolderId(@PathVariable("userid") int userid, @PathVariable("expenseid") int expenseid) throws Exception {
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
    public ExpenseOrEarningInDetailDTO getExpenseFromAccountHolderId(@PathVariable("userid") int userid , @PathVariable("expenseid") int expenseid) throws Exception{
        ExpenseOrEarningInDetailDTO tempExpense= expensesService.getExpenseWithIdFromAccountHolderId(userid,expenseid);

        //return the updated expense
        return tempExpense;
    }


    //get total expenditure on essential expenses
    @GetMapping("/essential")
    public ResponseEntity<Map<String, Object>> getUserEssentialExpenditure(@PathVariable("userid") int userid ){
        return expensesService.getSubCategoryExpensesTotal(userid,"essential");


    }

    @GetMapping("/luxury")
    public ResponseEntity<Map<String, Object>> getUserLuxuryExpenditure(@PathVariable("userid") int userid){
        return expensesService.getSubCategoryExpensesTotal(userid,"Luxury");
    }



}


