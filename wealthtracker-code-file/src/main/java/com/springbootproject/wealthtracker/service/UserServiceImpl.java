package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.Security.CustomUserDetailsService;
import com.springbootproject.wealthtracker.config.PasswordEncoderConfig;
import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.dao.SubscriptionRepository;
import com.springbootproject.wealthtracker.dao.UserSettingsRepository;
import com.springbootproject.wealthtracker.dto.LoginResponseDTO;
import com.springbootproject.wealthtracker.dto.entities.SubscriptionDTO;
import com.springbootproject.wealthtracker.dto.entities.UserDTO;
import com.springbootproject.wealthtracker.dto.entities.UserSettingsDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Subscription;
import com.springbootproject.wealthtracker.entity.UserSettings;
import com.springbootproject.wealthtracker.error.NotFoundException;
import com.springbootproject.wealthtracker.mapper.AccountHolderMapper;
import com.springbootproject.wealthtracker.mapper.SubscriptionMapper;
import com.springbootproject.wealthtracker.mapper.UserSettingsMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final AccountHolderRepository accountHolderRepository;
    private  final SubscriptionMapper subscriptionMapper;
    private  final UserSettingsMapper userSettingsMapper;
    private  final AccountHolderMapper accountHolderMapper;
    private  final UserSettingsRepository userSettingsRepository;
    private  final SubscriptionRepository subscriptionRepository;


    @Autowired
    public UserServiceImpl( AccountHolderRepository accountHolderRepository, SubscriptionMapper subscriptionMapper, UserSettingsMapper userSettingsMapper, AccountHolderMapper accountHolderMapper, UserSettingsRepository userSettingsRepository, SubscriptionRepository subscriptionRepository) {
        this.accountHolderRepository = accountHolderRepository;
        this.subscriptionMapper = subscriptionMapper;
        this.userSettingsMapper = userSettingsMapper;
        this.accountHolderMapper = accountHolderMapper;
        this.userSettingsRepository = userSettingsRepository;
        this.subscriptionRepository = subscriptionRepository;
    }



    @Override
    @Transactional
    public LoginResponseDTO updateAndSaveUserProfile(int userid,LoginResponseDTO updatedDetails) {
       UserDTO userDTO= updateUserProfile(userid,updatedDetails.getUser());
       UserSettingsDTO userSettingsDTO=updateUserSettings(userid,updatedDetails.getUserSettings());
       SubscriptionDTO subscriptionDTO=updateSubscription(userid,updatedDetails.getSubscription());
       return LoginResponseDTO
               .builder()
               .user(userDTO)
               .userSettings(userSettingsDTO)
               .subscription(subscriptionDTO)
               .build();


    }


    @Override
    public UserDTO updateUserProfile(int userId, UserDTO userDTO) {
        AccountHolder accountHolder = accountHolderRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // MapStruct will update only non-null fields
        accountHolderMapper.updateEntityFromDto(userDTO, accountHolder);

        accountHolderRepository.save(accountHolder);

        return accountHolderMapper.toDTO(accountHolder);
    }

    @Override
    public UserSettingsDTO updateUserSettings(int userId, UserSettingsDTO dto) {
        AccountHolder user = accountHolderRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSettings settings = user.getUserSettings();

        userSettingsMapper.updateEntityFromDto(dto, settings);

        userSettingsRepository.save(settings);

        return userSettingsMapper.toDTO(settings);
    }


    @Override
    @Transactional
    public SubscriptionDTO updateSubscription(int userid, SubscriptionDTO dto) {
        Subscription subscription = subscriptionRepository.findTopByAccountHolderIdOrderByStartDateDesc(userid)
                        .orElse(null);


        if(subscription!=null) {
            subscriptionMapper.updateEntityFromDto(dto, subscription);

            subscriptionRepository.save(subscription);
            return subscriptionMapper.toDTO(subscription);
        }
        return null;
    }
}
