package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/auth")
public class AuthController {
    private UserService userService;
    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    //register new user
    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody RegisterUserDTO registerUserDTO){
        userService.validateEmail(registerUserDTO.getEmail());
        userService.registerUser(registerUserDTO);
        return ResponseEntity.ok("User registered successfully");
    }

    @DeleteMapping("/{userid}")
    @PreAuthorize("#userid.toString() == principal.username")
    public ResponseEntity<String> deleteUser(@PathVariable("userid") int userid){
        System.out.println("DELETING USER WITH ID : " + userid);
        userService.deleteUser(userid);
        System.out.println("USER DELETED");
        System.out.println("DONE!!");
        return  ResponseEntity.ok("User Deleted Successfully");

    }


}
