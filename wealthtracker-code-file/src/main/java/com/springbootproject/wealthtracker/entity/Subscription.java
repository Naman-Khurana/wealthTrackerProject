package com.springbootproject.wealthtracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
@Table(name = "subscription")
@Getter
@Setter
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AccountHolder accountHolder;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plans plan;
}
