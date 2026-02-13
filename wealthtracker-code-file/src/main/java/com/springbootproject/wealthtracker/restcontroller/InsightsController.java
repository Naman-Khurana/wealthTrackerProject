package com.springbootproject.wealthtracker.restcontroller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/api/insights")
//feature in development
public class InsightsController {

   /* @GetMapping("/expenses/{expenseId}")
    public void getExpensesInsights(@PathVariable ("expenseId") int expenseId){
        //add the relevant service

        //return the required ans

    }

*/
}
