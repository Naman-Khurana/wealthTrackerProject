package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.CustomUserDetailsService;
import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.LoginResponse;
import com.springbootproject.wealthtracker.dto.LoginUserDTO;
import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.service.AuthenticationService;
import jakarta.validation.Valid;
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

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {
    private AuthenticationService authenticationService;
    private AuthenticationManager authenticationManager;
    private CustomUserDetailsService customUserDetailsService;
    private JWTUtil jwtUtil;

    @Autowired
    public AuthController(AuthenticationService authenticationService, AuthenticationManager authenticationManager, CustomUserDetailsService customUserDetailsService, JWTUtil jwtUtil) {
        this.authenticationService = authenticationService;
        this.authenticationManager = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
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
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(),loginUserDTO.getPassword())) ;
        }
        catch (BadCredentialsException e){
            throw new Exception("Incorrect email or password"+e);
        }
        UserDetails userDetails= customUserDetailsService.loadUserByUsername(loginUserDTO.getEmail());
        String userId=userDetails.getUsername();
        //primary token
        String jwt=jwtUtil.generateToken(userDetails);


        //this features is still incomplete for now
        //create refresh token value
        String refreshToken=jwtUtil.generateCustomToken(userDetails,1000*60*60*24*7);
        //for now adding refresh token as prt of login response since without frontend cookies can't be happened
        //later use http cookie response
        ResponseCookie cookie=ResponseCookie.from("jwt",jwt)
                .httpOnly(true)
                .path("/")
                .maxAge(Duration.ofHours(2))
                .sameSite("Strict")
                .build();

//        LoginResponse loginResponse=new LoginResponse();
//        loginResponse.setToken(jwt);
//        loginResponse.setExpiresIn(jwtUtil.getExpirationTime());



        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body(userId );
    }

    @GetMapping("{userid}/logout")
    public ResponseEntity<String> logoutUser(@PathVariable("userid") int userid,@RequestHeader("Authorization") String token){

//        authenticationService.logoutUser(token);
        ResponseCookie cookie=ResponseCookie.from("jwt","")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        //return response entity showing logout successful
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body("Logged Out");

    }

//    @PostMapping("/refresh-token")
//    public ResponseEntity<?> refreshToken(@RequestBody String refreshToken ){
//        //call the auth service function for refreshing the token
//
//        //if successful return response entiyt sucess
//
//        //otherwise return unauthorized error
//    }


}
