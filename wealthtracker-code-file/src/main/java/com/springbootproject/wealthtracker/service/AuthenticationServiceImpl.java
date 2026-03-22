package com.springbootproject.wealthtracker.service;


import com.springbootproject.wealthtracker.Security.CustomUserDetailsService;
import com.springbootproject.wealthtracker.Security.JWTUtil;
import com.springbootproject.wealthtracker.Security.TokenBlackList;
import com.springbootproject.wealthtracker.config.PasswordEncoderConfig;
import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.dao.RolesRepository;
import com.springbootproject.wealthtracker.dto.LoginResponseDTO;
import com.springbootproject.wealthtracker.dto.LoginUserDTO;
import com.springbootproject.wealthtracker.dto.RegisterUserDTO;
import com.springbootproject.wealthtracker.dto.entities.SubscriptionDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Roles;
import com.springbootproject.wealthtracker.entity.Subscription;
import com.springbootproject.wealthtracker.entity.UserSettings;
import com.springbootproject.wealthtracker.enums.TokenType;
import com.springbootproject.wealthtracker.error.AlreadyExistsException;
import com.springbootproject.wealthtracker.error.InvalidEmailFormatException;
import com.springbootproject.wealthtracker.error.UnauthorizedException;
import com.springbootproject.wealthtracker.mapper.AccountHolderMapper;
import com.springbootproject.wealthtracker.mapper.SubscriptionMapper;
import com.springbootproject.wealthtracker.mapper.UserSettingsMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    public static String JWT="jwt";
    public static String USER="user";

    private final AccountHolderRepository accountHolderRepository;
    private final RolesRepository rolesRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoderConfig passwordEncoderConfig;
    private final TokenBlackList tokenBlackList;
    private final CustomUserDetailsService customUserDetailsService;
    private final JWTUtil jwtUtil;
    private final AccountHolderMapper accountHolderMapper;
    private final SubscriptionService subscriptionService;
    private final UserSettingsMapper userSettingsMapper;
    private final SubscriptionMapper subscriptionMapper;


    @Autowired
    public AuthenticationServiceImpl(AccountHolderRepository accountHolderRepository, RolesRepository rolesRepository, AuthenticationManager authenticationManager, PasswordEncoderConfig passwordEncoderConfig, TokenBlackList tokenBlackList, CustomUserDetailsService customUserDetailsService, JWTUtil jwtUtil, AccountHolderMapper accountHolderMapper, SubscriptionService subscriptionService, UserSettingsMapper userSettingsMapper, SubscriptionMapper subscriptionMapper) {
        this.accountHolderRepository = accountHolderRepository;
        this.rolesRepository = rolesRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoderConfig = passwordEncoderConfig;
        this.tokenBlackList = tokenBlackList;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
        this.accountHolderMapper = accountHolderMapper;
        this.subscriptionService = subscriptionService;
        this.userSettingsMapper = userSettingsMapper;
        this.subscriptionMapper = subscriptionMapper;
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
    public AccountHolder authenticate(LoginUserDTO loginUserDTO) throws Exception{
        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(),loginUserDTO.getPassword()));

        } catch (BadCredentialsException e){
            throw new Exception("Incorrect email or password"+e);
        }
        return accountHolderRepository.findUserForLogin(loginUserDTO.getEmail()).orElse(null);
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

    @Override
    public LoginResponseDTO login(LoginUserDTO loginUserDTO) throws Exception {
        Map<String,Object> response= new HashMap<>();
        AccountHolder authenticatedUser=authenticate(loginUserDTO);

        UserSettings userSettings=authenticatedUser.getUserSettings();
        Set<Subscription> subscriptions= authenticatedUser.getSubscriptions();
        List<Roles> roles= authenticatedUser.getRoles();

        Subscription activeSubscription = subscriptionService.findActiveSubscription(subscriptions);

        UserDetails userDetails= customUserDetailsService.loadUserByUsername(loginUserDTO.getEmail());
        //primary token
        String jwt=jwtUtil.generateToken(userDetails,TokenType.ACCESS_TOKEN);

        String refreshToken=jwtUtil.generateToken(userDetails, TokenType.REFRESH_TOKEN);


        return LoginResponseDTO.builder()
                .user(accountHolderMapper.toDTO(authenticatedUser))
                .jwt(jwt)
                .userSettings(userSettingsMapper.toDTO(userSettings))
                .subscription(subscriptionMapper.toDTO(activeSubscription))
                .refreshToken(refreshToken)
                .build();

    }

    @Override
    public LoginResponseDTO authenticationWithRefreshToken(String refreshToken) throws Exception {
        jwtUtil.validateToken(refreshToken);

        if(!jwtUtil.isRefreshToken(refreshToken)){
            throw new UnauthorizedException("Invalid refresh token");
        }

        String  userid=jwtUtil.extractUserIdFromToken(refreshToken);

        UserDetails userDetails=customUserDetailsService.loadUserByUsername(userid);

        String newAccessToken=jwtUtil.generateToken(userDetails,TokenType.ACCESS_TOKEN);

        return LoginResponseDTO.builder()
                .jwt(newAccessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
