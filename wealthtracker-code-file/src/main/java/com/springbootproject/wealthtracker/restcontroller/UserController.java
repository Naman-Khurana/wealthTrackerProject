package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.LoginResponseDTO;
import com.springbootproject.wealthtracker.service.UserService;
import com.springbootproject.wealthtracker.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserController {


    private final JWTUtil jwtUtil;
    private final UserService userService;

    @Autowired
    public UserController(JWTUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PutMapping
    public ResponseEntity<?> updateUserProfile(@CookieValue(value = "jwt") String token,@RequestBody LoginResponseDTO updatedUserDetails){
        AuthUtils.checkAuthToken(token);

        int userid=Integer.parseInt(jwtUtil.extractUserIdFromToken(token));
        LoginResponseDTO responseDTO=userService.updateAndSaveUserProfile(userid,updatedUserDetails);

        return ResponseEntity.ok()
                .body(responseDTO);

    }

}
