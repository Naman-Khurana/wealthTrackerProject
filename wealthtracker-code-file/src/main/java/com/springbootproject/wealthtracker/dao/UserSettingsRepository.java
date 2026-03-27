package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSettingsRepository extends JpaRepository<UserSettings,Integer> {
}
