package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.Earnings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EarningsRepository extends JpaRepository<Earnings,Integer>,EarningsCustomRepository{
}
