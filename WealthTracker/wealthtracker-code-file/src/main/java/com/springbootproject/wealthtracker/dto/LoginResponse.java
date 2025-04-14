package com.springbootproject.wealthtracker.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;
    private double expiresIn;
    private String refreshToken;

}
