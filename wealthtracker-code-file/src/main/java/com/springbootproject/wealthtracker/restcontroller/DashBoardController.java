package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.DashBoardHomeDTO;
import com.springbootproject.wealthtracker.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
//@PreAuthorize("hasRole('USER')")
@RequestMapping("/api/dashboard")
public class DashBoardController {
    private DashBoardService theDashBoardService;
    private JWTUtil jwtUtil;

    @Autowired
    public DashBoardController(DashBoardService theDashBoardService,JWTUtil jwtUtil) {
        this.jwtUtil=jwtUtil;
        this.theDashBoardService = theDashBoardService;}

    @GetMapping("/")
    public DashBoardHomeDTO displayDashBoard(
            @CookieValue(name = "jwt", required = false) String token
    ){
        if (token == null) {
            throw new RuntimeException("Unauthorized - JWT token missing");
        }
        String username = jwtUtil.extractUserName(token);

        System.out.println("Authenticated as: " + username);

        DashBoardHomeDTO tempDispalay=theDashBoardService.getDashBoardData(Integer.parseInt(username));


        return tempDispalay;
    }
}
