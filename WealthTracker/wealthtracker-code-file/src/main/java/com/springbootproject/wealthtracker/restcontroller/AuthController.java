package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.CustomUserDetailsService;
import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.LoginResponse;
import com.springbootproject.wealthtracker.dto.LoginUserDTO;
import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.service.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/auth")
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
    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody RegisterUserDTO registerUserDTO){
        authenticationService.validateEmail(registerUserDTO.getEmail());
        authenticationService.registerUser(registerUserDTO);
        return ResponseEntity.ok("User registered successfully");
    }

    @DeleteMapping("/{userid}")
    @PreAuthorize("#userid.toString() == principal.username")
    public ResponseEntity<String> deleteUser(@PathVariable("userid") int userid){
        System.out.println("DELETING USER WITH ID : " + userid);
        authenticationService.deleteUser(userid);
        System.out.println("USER DELETED");
        System.out.println("DONE!!");
        return  ResponseEntity.ok("User Deleted Successfully");

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDTO loginUserDTO) throws Exception{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(),loginUserDTO.getPassword())) ;
        }
        catch (BadCredentialsException e){
            throw new Exception("Incorrect email or password"+e);
        }
        UserDetails userDetails= customUserDetailsService.loadUserByUsername(loginUserDTO.getEmail());
        String userId=userDetails.getUsername();
        String jwt=jwtUtil.generateToken(userDetails);
        LoginResponse loginResponse=new LoginResponse();
        loginResponse.setToken(jwt);
        loginResponse.setExpiresIn(jwtUtil.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }


}
