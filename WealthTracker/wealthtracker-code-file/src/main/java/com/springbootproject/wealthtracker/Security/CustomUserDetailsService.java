package com.springbootproject.wealthtracker.Security;

import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.error.NotFoundException;
import com.springbootproject.wealthtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserService userService;
    private AccountHolderRepository accountHolderRepository;

    @Autowired
    public CustomUserDetailsService(UserService userService, AccountHolderRepository accountHolderRepository) {
        this.userService = userService;
        this.accountHolderRepository = accountHolderRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AccountHolder accountHolder;
        //if email is inputted ==> during login
        if(email.contains("@")){
            accountHolder= userService.getUserbyEmail(email);
        }
        else {
            accountHolder=accountHolderRepository.findById(Integer.parseInt(email)).orElseThrow(() -> new RuntimeException("USER NOT FOUND "));
        }
        System.out.println("EMAIL IS : "+ email);
        if(accountHolder==null) {
            System.out.println("Insdie");
            throw new NotFoundException("USER NOT FOUND  custom user details here");
        }

        List<GrantedAuthority> authorities=accountHolder.getRoles().stream()
                .map( roles -> new SimpleGrantedAuthority(roles.getRole()))
                .collect(Collectors.toList());

        System.out.println(accountHolder.getId());
        return new User(String.valueOf(accountHolder.getId()),accountHolder.getPassword(),authorities);
    }



}
