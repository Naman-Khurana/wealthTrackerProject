package com.springbootproject.wealthtracker.service;


import com.springbootproject.wealthtracker.Security.TokenBlackList;
import com.springbootproject.wealthtracker.config.PasswordEncoderConfig;
import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.dao.RolesRepository;
import com.springbootproject.wealthtracker.dto.LoginUserDTO;
import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Roles;
import com.springbootproject.wealthtracker.error.AlreadyExistsException;
import com.springbootproject.wealthtracker.error.InvalidEmailFormatException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private AccountHolderRepository accountHolderRepository;
    private RolesRepository rolesRepository;
    private AuthenticationManager authenticationManager;
    private PasswordEncoderConfig passwordEncoderConfig;
    private TokenBlackList tokenBlackList;


    @Autowired
    public AuthenticationServiceImpl(AccountHolderRepository accountHolderRepository, RolesRepository rolesRepository, AuthenticationManager authenticationManager, PasswordEncoderConfig passwordEncoderConfig, TokenBlackList tokenBlackList) {
        this.accountHolderRepository = accountHolderRepository;
        this.rolesRepository = rolesRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoderConfig = passwordEncoderConfig;
        this.tokenBlackList = tokenBlackList;
    }

    @Override
    @Transactional
    public void registerUser(RegisterUserDTO registerUserDTO) {
        Optional<AccountHolder> existingUser=accountHolderRepository.findByEmail(registerUserDTO.getEmail());
        if(existingUser.isPresent()){

            System.out.println(accountHolderRepository.findByEmail(registerUserDTO.getEmail()));
            throw new RuntimeException("User with this email already exists ! ");
        }

        //get the user
        AccountHolder newUser= new AccountHolder();

        // add necessary details
        newUser.setEmail(registerUserDTO.getEmail());
        newUser.setFirstName(registerUserDTO.getFirstName());
        newUser.setLastName(registerUserDTO.getLastName());
        //encode password
        String tempencodedpassword=passwordEncoderConfig.passwordEncoder().encode(registerUserDTO.getPassword());
        // add password
        newUser.setPassword(tempencodedpassword);

        //create the role you want to add the to the user
        Roles role=new Roles("ROLE_USER");

        //Associate the user with role
        // .add() is a bi-directional convenience method
        newUser.add(role);

        //save the user( and thererfore automatically role)
        accountHolderRepository.save(newUser);


    }

    @Override
    @Transactional
    public void deleteUser(int userId) {
        AccountHolder tempAccountHolder=accountHolderRepository.findById(userId).orElseThrow(() -> new RuntimeException("USER WITH USER ID " + userId + " DOESN'T EXIST."));
        accountHolderRepository.delete(tempAccountHolder);

    }

    @Override
    public void validateEmail(String email) {
        checkEmailFormat(email);
        checkEmailExistence(email);
    }

    @Override
    public void checkEmailExistence(String email) {
        if(accountHolderRepository.findByEmail(email).isPresent())
            throw new AlreadyExistsException("EMAIL ADDRESS ALREADY LINKED TO EXISTING ACCOUNT!! ");
    }

    @Override
    public void checkEmailFormat(String email) {
        List<String> domains=List.of(".in",".com");
        if(!email.contains("@") || !(domains.stream().anyMatch(email::contains)))
            throw new InvalidEmailFormatException("The email doesn't match with format requested. Make sure it Contains '@' and and one of the postfix domains are used  : " + domains);

    }

    @Override
    public AccountHolder authenticate(LoginUserDTO loginUserDTO) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(),loginUserDTO.getPassword()));

        return accountHolderRepository.findByEmail(loginUserDTO.getEmail()).orElseThrow();
    }


    @Override
    public void logoutUser(String token) {
        // check if the token is valid

        // add the token to blacklist
        //remove the bearer part of token
        String jwt=token.substring(7);

        try {
            tokenBlackList.blackListToken(jwt);
        }
        catch (Exception e){
            System.out.println("Error occurred while logging user out.");
            throw e;
        }


    }
}
