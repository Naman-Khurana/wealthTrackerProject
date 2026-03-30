package com.springbootproject.wealthtracker.entity;

import com.springbootproject.wealthtracker.enums.CurrencyEnum;
import com.springbootproject.wealthtracker.enums.TimeZoneEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;

@Entity
@Table(name = "user_settings")
@Getter
@Setter
public class UserSettings {

    @Id
    @Column(name = "user_id")
    private int userId;

    private String currency= CurrencyEnum.INR.getValue();
    private String timezone= TimeZoneEnum.ASIA_KOLKATA.getValue();

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private AccountHolder accountHolder;


}