package com.springbootproject.wealthtracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "account_holder")
public class AccountHolder implements UserDetails {
    //atrributes setup
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name="password")
    private String password;


    @JsonIgnore
    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.ALL}
    )
    private List<Earnings> earnings;
    @JsonIgnore
    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.ALL}
    )
    private List<Expenses> expenses;
    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    private List<Roles> roles;

    @JsonIgnore
    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<Budget> budgets;

    @JsonIgnore
    @OneToOne(mappedBy = "accountHolder",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private UserSettings userSettings;

    @JsonIgnore
    @OneToMany(mappedBy = "accountHolder",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private Set<Subscription> subscriptions;


    //constructors

    public AccountHolder() {
    }

    public AccountHolder(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    //getters setters
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return Integer.toString(id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    //toString


    @Override
    public String toString() {
        return "AccountHolder{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    //convenience Bi-Directional methods

    //for Expenses
    public void add(Expenses tempExpenses){
        if(expenses==null)
            expenses=new ArrayList<>();
        //now add relation bettween the two entities from both the sides

        //from AccountHolder side
        expenses.add(tempExpenses);

        //from Expenses side
        tempExpenses.setAccountHolder(this);
    }

    //for Earnings

    public void add(Earnings tempEarnings){
        if(earnings==null){
            earnings=new ArrayList<>();
        }
        //accountholder --> earnings
        earnings.add(tempEarnings);
        //earnings--> accountholder
        tempEarnings.setAccountHolder(this);
    }

    //for  roles
    public void add(Roles role){
        if(roles==null){
            roles=new ArrayList<>();
        }
        roles.add(role);
        role.setAccountHolder(this);
    }

    //for budget
    public void add(Budget budget){
        if(budgets==null){
            budgets=new ArrayList<>();
        }
        budgets.add(budget);
        budget.setAccountHolder(this);
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }



}
