package com.springbootproject.wealthtracker.Security;


import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class TokenBlackList {


    private Set<String> blacKList=new HashSet<>();

    public void blackListToken(String token){
        blacKList.add(token);
    }

    public boolean isTokenBlackListed(String token){
        return blacKList.contains(token);
    }

}
