package com.springbootproject.wealthtracker.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserDTO {
    @NotBlank
    @Email(message = "Invalid Email Format.")
    private String email;

    @NotBlank
    private String password;
}
