package com.springbootproject.wealthtracker;

import com.springbootproject.wealthtracker.dto.DashBoardHomeDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;
import com.springbootproject.wealthtracker.service.DashBoardService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import java.time.LocalDate;
import java.sql.Date;

@SpringBootApplication
public class WealthtrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(WealthtrackerApplication.class,args);
	}
//	@Bean


}
