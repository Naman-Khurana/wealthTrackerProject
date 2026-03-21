package com.springbootproject.wealthtracker.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;

import java.util.List;

@Entity
@Table(name = "plans")
@Getter
@Setter
public class Plans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private double price;

    @Column(name = "duration_days")
    private int durationDays;

    @OneToMany(mappedBy = "plan")
    private List<Subscription> subscriptions;
}