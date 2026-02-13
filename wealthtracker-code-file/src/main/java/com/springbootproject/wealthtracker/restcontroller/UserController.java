package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.service.UserService;
import lombok.AccessLevel;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<AccountHolder>> allUsers(){
        List<AccountHolder> accountHolders=userService.allAccountHolders();
        return ResponseEntity.ok(accountHolders);
    }
}
