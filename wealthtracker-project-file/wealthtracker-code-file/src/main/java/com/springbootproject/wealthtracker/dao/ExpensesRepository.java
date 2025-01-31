package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpensesRepository extends JpaRepository<Expenses,Integer>,ExpensesCustomRepository {

    List<Expenses> findByAccountHolder(AccountHolder accountHolder);

}
