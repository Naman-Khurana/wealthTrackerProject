package com.springbootproject.wealthtracker.config;

import com.springbootproject.wealthtracker.Security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    CustomUserDetailsService customUserDetailsService;
    PasswordEncoderConfig passwordEncoderConfig;

    @Autowired
    public AppConfig(CustomUserDetailsService customUserDetailsService, PasswordEncoderConfig passwordEncoderConfig) {
        this.customUserDetailsService = customUserDetailsService;
        this.passwordEncoderConfig = passwordEncoderConfig;
    }

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Bean
    AuthenticationProvider authenticationProvider(){


        DaoAuthenticationProvider authProvider=new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoderConfig.passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


}
