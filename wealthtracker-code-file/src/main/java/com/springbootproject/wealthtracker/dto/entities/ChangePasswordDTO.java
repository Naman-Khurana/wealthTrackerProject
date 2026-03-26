package com.springbootproject.wealthtracker.dto.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChangePasswordDTO {
    String oldPassword;
    String newPassword;
}
