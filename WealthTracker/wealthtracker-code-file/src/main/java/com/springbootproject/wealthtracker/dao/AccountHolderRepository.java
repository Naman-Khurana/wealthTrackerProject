package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountHolderRepository extends JpaRepository<AccountHolder,Integer>,AccountHolderCustomRepository {
    Optional<AccountHolder> findByEmail(String email);
}
