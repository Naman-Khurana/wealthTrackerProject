package com.springbootproject.wealthtracker.restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserController {

//    @PutMapping
//    public ResponseEntity<?> updateUserProfile(@CookieValue(value = "jwt") String token,)
}
