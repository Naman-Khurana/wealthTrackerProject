package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import com.springbootproject.wealthtracker.dao.RolesRepository;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Roles;
import com.springbootproject.wealthtracker.error.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImpl implements UserService{
    private AccountHolderRepository accountHolderRepository;
    private RolesRepository rolesRepository;

    @Autowired
    public UserServiceImpl(AccountHolderRepository accountHolderRepository, RolesRepository rolesRepository) {
        this.accountHolderRepository = accountHolderRepository;
        this.rolesRepository = rolesRepository;
    }

    @Override
    public AccountHolder getUserbyEmail(String email) {
        System.out.println("Email is  : " + email);
        return accountHolderRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("THE USER WITH THIS EMAIL DOESN'T EXIST"));

    }

    @Override
    public List<Roles> getRolesForUser(AccountHolder accountHolder) {
        return rolesRepository.findByAccountHolder(accountHolder);
    }

    @Override
    public List<AccountHolder> allAccountHolders() {
        List<AccountHolder> accountHolders=new ArrayList<>();

        accountHolderRepository.findAll().forEach(accountHolders::add);
        return accountHolders;
    }
}
