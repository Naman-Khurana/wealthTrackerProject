package com.springbootproject.wealthtracker.Security;

import com.springbootproject.wealthtracker.error.ErrorResponseDTO;
import com.springbootproject.wealthtracker.error.InvalidEmailFormatException;
import com.springbootproject.wealthtracker.error.jwtTokenExpirationException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private HandlerExceptionResolver handlerExceptionResolver;
    private JWTUtil jwtUtil;
    private CustomUserDetailsService customUserDetailsService;
    private TokenBlackList tokenBlackList;


    @Autowired
    public JwtAuthenticationFilter(HandlerExceptionResolver handlerExceptionResolver, JWTUtil jwtUtil, CustomUserDetailsService customUserDetailsService, TokenBlackList tokenBlackList) {
        this.handlerExceptionResolver = handlerExceptionResolver;
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.tokenBlackList = tokenBlackList;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader=request.getHeader("Authorization");
        System.out.println("Request : " + request);
        System.out.println("AUTH HEADER :  " + authHeader);
        System.out.println("CT HEADER :  " + request.getHeader("Content-Type"));

        String userId=null;
        String jwt=null;
        System.out.println("Code has reached before authorization validation");
        final String authorizationHeader=request.getHeader("Authorization");
        try{
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                //            System.out.println("Code has reached mid auth validation");
                jwt = authorizationHeader.substring(7);

                try {
                    userId = jwtUtil.extractUserName(jwt);
                }catch ( ExpiredJwtException e){
                    throw new jwtTokenExpirationException(null,null,"YOUR SESSION HAS EXPIRED. PLEASE LOGIN AGAIN.");
                }

            }else{
                if (request.getCookies() != null) {
                    for (Cookie cookie : request.getCookies()) {
                        if (cookie.getName().equals("jwt")) {
                            jwt = cookie.getValue();
                            break;
                        }
                    }
                }
            }
            if(jwt!=null){
                userId=jwtUtil.extractUserName(jwt);
            }
        }catch (ExpiredJwtException e){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(e.getMessage());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            return;
        }
        /*try{
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
    //            System.out.println("Code has reached mid auth validation");
                jwt = authorizationHeader.substring(7);

                if(jwtUtil.isTokenExpired(jwt)){

                    throw new jwtTokenExpirationException(null,null,"TOKEN HAS EXPIRED");
                }


                try {
                    userId = jwtUtil.extractUserName(jwt);
                }catch ( ExpiredJwtException e){
                    throw new jwtTokenExpirationException(null,null,"EXPIRED TOKEN ERROR");
                }

            }
        }catch (ExpiredJwtException e){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(e.getMessage());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            return;
        }*/
        System.out.println("Code has reached after auth validation");

        System.out.println("Code has reached before user validation");
        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            System.out.println("Code has reached after user validation");
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userId);
            System.out.println("Code has reached before token validation");
            if (jwtUtil.isTokenValid(jwt, userDetails) && !tokenBlackList.isTokenBlackListed(jwt)) {

                System.out.println("Code has reached post token validation");
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
            else if (tokenBlackList.isTokenBlackListed(jwt)){
                System.out.println("the token is blacklisted/logged out.");

            }
        }
        filterChain.doFilter(request,response);


    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest requests) throws ServletException{
        String path=requests.getRequestURI();
        return path.equals("/api/auth/login") ||
                path.equals("/api/auth/.*/logout") ||
                path.equals("/api/auth/register");
    }
}
