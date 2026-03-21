package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountHolderRepository extends JpaRepository<AccountHolder,Integer>,AccountHolderCustomRepository {
    Optional<AccountHolder> findByEmail(String email);


    @Query("""
            SELECT DISTINCT a FROM AccountHolder a
            LEFT JOIN FETCH a.userSettings
            LEFT JOIN FETCH a.subscriptions
            LEFT JOIN FETCH a.roles
            WHERE a.email = :email
            """)
    Optional<AccountHolder> findUserForLogin(@Param("email") String email);
}
