package com.springbootproject.wealthtracker.entity;

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

    private String currency;
    private String timezone;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private AccountHolder accountHolder;


}