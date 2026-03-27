package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.CustomUserDetailsService;
import com.springbootproject.wealthtracker.Security.JWTUtil;

import com.springbootproject.wealthtracker.dto.LoginResponseDTO;
import com.springbootproject.wealthtracker.dto.LoginUserDTO;
import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.dto.entities.ChangePasswordDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.enums.AuthCookieType;
import com.springbootproject.wealthtracker.error.UnauthorizedException;
import com.springbootproject.wealthtracker.service.AuthenticationService;
import com.springbootproject.wealthtracker.utils.AuthUtils;
import jakarta.validation.Valid;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {
    private AuthenticationService authenticationService;
    private AuthenticationManager authenticationManager;
    private CustomUserDetailsService customUserDetailsService;
    private JWTUtil jwtUtil;

    @Autowired
    public AuthController(JWTUtil jwtUtil, CustomUserDetailsService customUserDetailsService, AuthenticationManager authenticationManager, AuthenticationService authenticationService) {

        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.authenticationManager = authenticationManager;
        this.authenticationService = authenticationService;
    }



    //register new user
    @PostMapping("/register")
    public ResponseEntity<String> signupUser(@Valid @RequestBody RegisterUserDTO registerUserDTO){
        authenticationService.validateEmail(registerUserDTO.getEmail());
        authenticationService.registerUser(registerUserDTO);
        return ResponseEntity.ok("User registered successfully");
    }


    //delete user
    @DeleteMapping("/{userid}")
    @PreAuthorize("#userid.toString() == principal.username")
    public ResponseEntity<String> deleteUser(@PathVariable("userid") int userid){
        System.out.println("DELETING USER WITH ID : " + userid);
        authenticationService.deleteUser(userid);
        System.out.println("USER DELETED");
        return  ResponseEntity.ok("User Deleted Successfully");

    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@Valid @RequestBody LoginUserDTO loginUserDTO) throws Exception{

        LoginResponseDTO authenticatedUserDetails=authenticationService.login(loginUserDTO);


        ResponseCookie jwtCookie=ResponseCookie.from("jwt",authenticatedUserDetails.getJwt())
                .httpOnly(true)
                .path("/")
                .maxAge(Duration.ofHours(2))
                .sameSite("Strict")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", authenticatedUserDetails.getRefreshToken())
                .httpOnly(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();

        authenticatedUserDetails.setJwt(null);
        authenticatedUserDetails.setRefreshToken(null);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(authenticatedUserDetails );
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(){

//        authenticationService.logoutUser(token);
        ResponseCookie cookie=ResponseCookie.from(AuthCookieType.JWT.getValue(),"")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        ResponseCookie refreshCookie=ResponseCookie.from(AuthCookieType.REFRESH.getValue(),"")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        //return response entity showing logout successful
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .header(HttpHeaders.SET_COOKIE,refreshCookie.toString())
                .body("Logged Out");

    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken",required = false) String refreshToken ) throws Exception{
        //call the auth service function for refreshing the token


        LoginResponseDTO responseDTO=authenticationService.authenticationWithRefreshToken(refreshToken);

        ResponseCookie jwtCookie=ResponseCookie.from("jwt",responseDTO.getJwt())
                .httpOnly(true)
                .path("/")
                .maxAge(Duration.ofMinutes(30))
                .sameSite("Strict")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", responseDTO.getRefreshToken())
                .httpOnly(true)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .sameSite("Strict")
                .build();
        //if successful return response entiyt sucess

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body("Authenticated");
        //otherwise return unauthorized error
    }


    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@CookieValue(value = "jwt", required = false) String token, @RequestBody ChangePasswordDTO changePasswordDTO){

        AuthUtils.checkAuthToken(token);

        String userid=jwtUtil.extractUserIdFromToken(token);

            authenticationService.changePassword(userid,changePasswordDTO);

//        TODO :     Implement Black listing invalid jwt,refresh tokens
//        authenticationService.logoutUser(token);

        return logoutUser();




    }



}
