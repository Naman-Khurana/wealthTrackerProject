package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dto.LoginResponseDTO;
import com.springbootproject.wealthtracker.dto.entities.SubscriptionDTO;
import com.springbootproject.wealthtracker.dto.entities.UserDTO;
import com.springbootproject.wealthtracker.dto.entities.UserSettingsDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;

public interface UserService {


    public LoginResponseDTO updateAndSaveUserProfile(int userid,LoginResponseDTO updatedDetails);
    public UserDTO updateUserProfile(int userId, UserDTO userDTO);
    public UserSettingsDTO updateUserSettings(int userId, UserSettingsDTO dto);
    public SubscriptionDTO updateSubscription(int subscriptionId, SubscriptionDTO dto);
}
