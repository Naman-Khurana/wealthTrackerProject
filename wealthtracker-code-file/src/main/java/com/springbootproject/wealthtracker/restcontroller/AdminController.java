package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/")
    public ResponseEntity<List<AccountHolder>> allUsers(){
        List<AccountHolder> accountHolders= adminService.allAccountHolders();
        return ResponseEntity.ok(accountHolders);
    }
}
