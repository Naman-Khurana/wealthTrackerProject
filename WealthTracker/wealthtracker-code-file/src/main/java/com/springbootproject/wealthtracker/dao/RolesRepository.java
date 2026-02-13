package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RolesRepository extends JpaRepository<Roles,Integer> {
    List<Roles> findByAccountHolder(AccountHolder accountHolder);
}
