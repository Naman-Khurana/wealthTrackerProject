package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dto.LoginUserDTO;
import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Roles;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface AuthenticationService {

     public void registerUser(RegisterUserDTO registerUserDTO);

     public void deleteUser(int userId);

     public void validateEmail(String email);
     public void checkEmailFormat(String email);

     public void checkEmailExistence(String email);

     public AccountHolder authenticate(LoginUserDTO loginUserDTO);

}
