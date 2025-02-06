package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.dto.EarningsHomeDataDTO;
import com.springbootproject.wealthtracker.dto.ExpenseOrEarningInDetailDTO;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.service.EarningsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("api/{userid}/earnings")
@PreAuthorize("#userid.toString() == principal.username")
public class EarningsController {

    private EarningsService earningsService;


    @Autowired
    public EarningsController(EarningsService earningsService) {
        this.earningsService = earningsService;
    }


    @GetMapping("/")
    public EarningsHomeDataDTO expensesHome(@PathVariable("userid") int userid,
                                            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd") LocalDate startDate,
                                            @RequestParam(required = false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd")LocalDate endDate) {
        //create a variable of type expensesdatadto
        EarningsHomeDataDTO tempEarningsHomeData = earningsService.getEarningsHomeData(userid,startDate,endDate);
        //return the required data
        return tempEarningsHomeData;
    }
    @PostMapping("/add")
    public ResponseEntity<String> addUserNewEarning(@RequestBody Earnings earnings, @PathVariable("userid") int userid) {
        //call the add new expense service

        System.out.println("Adding new Expense : " + earnings + " to User ID : " + userid);
        earningsService.addNewEarningsToUserUsingId(userid, earnings);
        System.out.println("New Earnings added.");
        return ResponseEntity.ok("User updated successfully");

    }

    @PutMapping("/update")
    public ExpenseOrEarningInDetailDTO updateUserEarnings(@RequestBody Earnings earnings, @PathVariable("userid") int userid) throws Exception {
        //call the add new expense service

        System.out.println("Updating : " + earnings + " to User ID : " + userid);
        ExpenseOrEarningInDetailDTO ans= earningsService.updateEarningToUser(userid,earnings);
        System.out.println(" Earnings Updated.");
        return ans;

    }

    @DeleteMapping("/delete/{earningid}")
    public ResponseEntity<String> deleteExpenseWithExpenseIdAndAccountHolderId(@PathVariable("userid") int userid, @PathVariable("earningid") int earningid) throws Exception {
        System.out.println("Removing Earning id : " + earningid + " from user id : " + userid);

        //call service function for deletion
        System.out.println("DELETING EARNING WITH ID : " + earningid);
        System.out.println("FROM ACCOUNT HOLDER " + userid);
        earningsService.deleteEarningWithIdFromAccountHolder(userid, earningid);
        System.out.println("EXPENSE DELETED.");

        //return response untity
        return ResponseEntity.ok("User Deleted   successfully");

    }

    @GetMapping("/{earningid}")
    //call service function for updating expense
    public ExpenseOrEarningInDetailDTO getEarningFromAccountHolderId(@PathVariable("userid") int userid , @PathVariable("earningid") int earningid) throws Exception{
        ExpenseOrEarningInDetailDTO tempEarning= earningsService.getEarningWithIdFromAccountHolderId(   userid,earningid);

        //return the updated expense
        return tempEarning;
    }

}
