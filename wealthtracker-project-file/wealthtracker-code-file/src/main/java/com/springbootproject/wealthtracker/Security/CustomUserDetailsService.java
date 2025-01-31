package com.springbootproject.wealthtracker.Security;

import com.springbootproject.wealthtracker.entity.AccountHolder;
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

    @Autowired
    public CustomUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AccountHolder accountHolder=userService.getUserbyEmail(email);
        if(accountHolder==null) {
            throw new UsernameNotFoundException("USER NOT FOUND ");
        }

        List<GrantedAuthority> authorities=accountHolder.getRoles().stream()
                .map( roles -> new SimpleGrantedAuthority(roles.getRole()))
                .collect(Collectors.toList());

        System.out.println(accountHolder.getId());
        return new User(String.valueOf(accountHolder.getId()),accountHolder.getPassword(),authorities);
    }



}
