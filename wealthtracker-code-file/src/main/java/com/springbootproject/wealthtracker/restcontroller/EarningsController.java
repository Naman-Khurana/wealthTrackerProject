package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.EarningsDTO;
import com.springbootproject.wealthtracker.dto.EarningsHomeDataDTO;
import com.springbootproject.wealthtracker.dto.MonthlyEarningsNExpensesDTO;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.service.EarningsService;
import com.springbootproject.wealthtracker.utils.AuthUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/earnings")
//@PreAuthorize("#userid.toString() == principal.username")
@Validated
public class EarningsController {

    private final EarningsService earningsService;
    private final JWTUtil jwtUtil;
    private static final Logger logger =
            LoggerFactory.getLogger(EarningsController.class);


    @Autowired
    public EarningsController(EarningsService earningsService, JWTUtil jwtUtil) {
        this.earningsService = earningsService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<EarningsDTO>> getEarningsWithTransactions(@CookieValue(name="jwt",required = false) String token,
                                                   @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd") LocalDate startDate,
                                                   @RequestParam(required = false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd")LocalDate endDate){
        AuthUtils.checkAuthToken(token);

        String username=jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        return ResponseEntity.ok(earningsService.getEarningsWithDetails(userid,startDate,endDate));
    }




    @GetMapping("/")
    public EarningsHomeDataDTO earningsHome(@CookieValue(name = "jwt", required = false) String token,
                                            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd") LocalDate startDate,
                                            @RequestParam(required = false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE,pattern = "yyyy/MM/dd")LocalDate endDate) {
        //create a variable of type expensesdatadto
        AuthUtils.checkAuthToken(token);

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        EarningsHomeDataDTO tempEarningsHomeData = earningsService.getEarningsHomeData(userid,startDate,endDate);
        //return the required data
        return tempEarningsHomeData;
    }
    @PostMapping("/")
    public ResponseEntity<Earnings> addNewEarning(@Valid @RequestBody EarningsDTO earnings, @CookieValue(name = "jwt", required = false) String token) {
        //call the add new expense service

        int userid= jwtUtil.extractUserId(token);
        Earnings savedEarnings=earningsService.addNewEarningsToUserUsingId(userid, earnings);
        logger.info("Added new earning : " + earnings + " for the user with ID : "+ userid);
        return ResponseEntity.ok(savedEarnings);

    }

    @PutMapping("/")
    public EarningsDTO updateUserEarnings(@RequestBody Earnings earnings, @CookieValue(name = "jwt", required = false) String token) throws Exception {
        //call the add new expense service

        int userid= jwtUtil.extractUserId(token);
        System.out.println("Updating : " + earnings + " to User ID : " + userid);
        EarningsDTO ans= earningsService.updateEarningToUser(userid,earnings);
        System.out.println(" Earnings Updated.");
        return ans;

    }

    @DeleteMapping("/delete/{earningid}")
    public ResponseEntity<String> deleteExpenseWithExpenseIdAndAccountHolderId(@CookieValue(name = "jwt", required = false) String token, @PathVariable("earningid") int earningid) throws Exception {

        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
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
    public EarningsDTO getEarningFromAccountHolderId(@CookieValue(name = "jwt", required = false) String token, @PathVariable("earningid") int earningid) throws Exception{
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }

        String username = jwtUtil.extractUserName(token);
        int userid=Integer.parseInt(username);
        EarningsDTO tempEarning= earningsService.getEarningWithIdFromAccountHolderId(   userid,earningid);

        //return the updated expense
        return tempEarning;
    }

    @GetMapping("/lastSixMonthsData")
    public ResponseEntity<?> getTestingDone(@CookieValue(name = "jwt", required = false) String token ){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);
        List<MonthlyEarningsNExpensesDTO> results=earningsService.getLastSixMonthsEarnings(Integer.parseInt(username));
        return ResponseEntity.ok(results);
    }


}
