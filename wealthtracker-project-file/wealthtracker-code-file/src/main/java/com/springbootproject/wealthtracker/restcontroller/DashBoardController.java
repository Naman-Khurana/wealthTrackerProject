package com.springbootproject.wealthtracker.restcontroller;

import com.springbootproject.wealthtracker.dto.DashBoardHomeDTO;
import com.springbootproject.wealthtracker.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/{userid}/dashboard")
@PreAuthorize("#userid.toString() == principal.username")
public class DashBoardController {
    private DashBoardService theDashBoardService;

    @Autowired
    public DashBoardController(DashBoardService theDashBoardService) {
        this.theDashBoardService = theDashBoardService;}

    @GetMapping("/")
    public DashBoardHomeDTO displayDashBoard(@PathVariable("userid") int userid ){
        DashBoardHomeDTO tempDispalay=theDashBoardService.getDashBoardData(userid);

        System.out.println();

        return tempDispalay;
    }
}
