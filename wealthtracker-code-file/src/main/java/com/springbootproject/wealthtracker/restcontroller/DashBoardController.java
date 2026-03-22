package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.dto.DashBoardHomeDTO;
import com.springbootproject.wealthtracker.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
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
        String userid = jwtUtil.extractUserIdFromToken(token);

        System.out.println("Authenticated as: " + userid);

        return theDashBoardService.getDashBoardData(Integer.parseInt(userid));


    }
}
