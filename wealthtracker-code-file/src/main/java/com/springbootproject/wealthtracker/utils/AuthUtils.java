package com.springbootproject.wealthtracker.utils;

import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.error.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthUtils {
    private final JWTUtil jwtUtil;


    @Autowired
    public AuthUtils(JWTUtil jwtUtil) {
        this.jwtUtil=jwtUtil;
    }

    public static void checkAuthToken(String token){
        if (token == null || token.isBlank()) {
            throw new UnauthorizedException("JWT token missing");
        }
    }


}
