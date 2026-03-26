package com.springbootproject.wealthtracker.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginUserDTO {
    @NotBlank
    @Email(message = "Invalid Email Format.")
    private String email;

    @NotBlank
    private String password;
}
