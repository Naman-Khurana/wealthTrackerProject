package com.springbootproject.wealthtracker.Security;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.error.jwtTokenExpirationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTUtil {

    @Value("${security.jwt.secret-key}")
    private String SECRET_KEY;

    @Value("${security-jwt.expiration-time}")
    private long jwtExpiration;


    private Key getSigningKey(){
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);

    }

    public String extractUserName(String token ){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        Claims claims=extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public long getExpirationTime(){
        return jwtExpiration;
    }

    public Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    public String generateToken(Map<String,Object> extraClaims,UserDetails userDetails){
        return buildToken(userDetails,jwtExpiration);
    }

    private String buildToken( UserDetails userDetails, long expiration){
        System.out.println("UserName of hte user is : " + userDetails.getUsername());
        return Jwts
                .builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis()+expiration)))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenExpired(String token){
        System.out.println("started istokenvalid");
        boolean expired=extractExpiration(token).before(new Date());

        return expired;
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username=extractUserName(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

}

