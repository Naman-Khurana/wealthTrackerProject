package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Roles;

import java.util.List;

public interface UserService {

    public AccountHolder getUserbyEmail(String email);

    public List<Roles> getRolesForUser(AccountHolder accountHolder);

    public List<AccountHolder> allAccountHolders();




}
