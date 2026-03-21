package com.springbootproject.wealthtracker.dto;

import com.springbootproject.wealthtracker.dto.entities.SubscriptionDTO;
import com.springbootproject.wealthtracker.dto.entities.UserDTO;
import com.springbootproject.wealthtracker.dto.entities.UserSettingsDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponseDTO {

    private String jwt;
    private String refreshToken;
        private UserDTO user;
    private UserSettingsDTO userSettings;
    private SubscriptionDTO subscription;

    // getters setters
}
