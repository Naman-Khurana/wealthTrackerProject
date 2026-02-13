package com.springbootproject.wealthtracker.Security;

import com.springbootproject.wealthtracker.dao.AccountHolderRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private AccountHolderRepository accountHolderRepository;

    @Autowired
    public CustomAuthenticationSuccessHandler(AccountHolderRepository accountHolderRepository) {
        this.accountHolderRepository = accountHolderRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        int userid=-1;
        try {

            String useridstr=authentication.getName();
            userid=Integer.parseInt(useridstr);
        }
        catch (NumberFormatException e){
            System.out.println("Invalid UserID format : " + authentication.getName());
        }
        response.sendRedirect("api/"+userid+"/dashboard/");
    }
}
