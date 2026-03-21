package com.springbootproject.wealthtracker.dto.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserSettingsDTO {
    private Integer userId;
    private String currency;
    private String theme;
}