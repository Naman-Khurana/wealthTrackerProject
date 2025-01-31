package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Roles;

import java.util.List;

public interface UserService {
     public AccountHolder getUserbyEmail(String email);

     public List<Roles> getRolesForUser(AccountHolder accountHolder);

     public void registerUser(RegisterUserDTO registerUserDTO);

     public void deleteUser(int userId);

     public void validateEmail(String email);
     public void checkEmailFormat(String email);

     public void checkEmailExistence(String email);

}
