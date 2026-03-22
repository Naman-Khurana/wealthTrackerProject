package com.springbootproject.wealthtracker.Security;

import com.springbootproject.wealthtracker.enums.TokenType;
import com.springbootproject.wealthtracker.error.UnauthorizedException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${security-jwt.refresh-token-expiration-time}")
    private long refreshTokenExpiration;


    private Key getSigningKey(){
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);

    }

    public String extractUserIdFromToken(String token ){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        Claims claims=extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String extractTokenType(String token){
        return extractClaim(token, claims -> claims.get("type", String.class));
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


    public String generateToken(UserDetails userDetails, TokenType tokenType){
        Map<String, Object> claims = new HashMap<>();


        if(tokenType==TokenType.ACCESS_TOKEN){
            claims.put("type",tokenType.name());
            return generateCustomToken(claims,userDetails,jwtExpiration);
        }else{
            claims.put("type",tokenType.name());
            return generateCustomToken(claims,userDetails,refreshTokenExpiration);
        }
    }

    public String generateToken(Map<String,Object> extraClaims,UserDetails userDetails){
        return buildToken(userDetails,jwtExpiration,null);
    }


    //for custom expiration time
    public String generateCustomToken(Map<String,Object> extraClaims,UserDetails userDetails,long customExpirationTime){

        return buildToken(userDetails,customExpirationTime,extraClaims);
    }
    public String generateCustomToken(UserDetails userDetails,int customExpirationTime){
        return buildToken(userDetails,customExpirationTime,null);
    }



    private String buildToken( UserDetails userDetails, long expiration,Map<String,Object> extraClaims){
        JwtBuilder builder= Jwts.builder();
        if(extraClaims!=null){
            builder.claims(extraClaims);
        }

        return builder
            .subject(userDetails.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date((System.currentTimeMillis()+expiration)))
            .signWith(getSigningKey())
            .compact();
    }



    public boolean isTokenExpired(String token){
        System.out.println("started istokenvalid");

        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username= extractUserIdFromToken(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

//    public boolean isTokenValid

    public int extractUserId(String token) {

        if (token == null || token.isBlank()) {
            throw new UnauthorizedException("JWT token missing");
        }

        String username = extractUserIdFromToken(token);

        return Integer.parseInt(username);
    }


    public boolean isRefreshToken(String token){
        return TokenType.REFRESH_TOKEN.name().equals(extractTokenType(token));
    }

    public boolean isAccessToken(String token){
        return TokenType.ACCESS_TOKEN.name().equals(extractTokenType(token));
    }

    public void validateToken(String token){
        try{
            extractAllClaims(token);
        }
        catch (ExpiredJwtException e){
            throw new UnauthorizedException("Token Expired");
        }
        catch(JwtException e){
            throw new UnauthorizedException("Invalid Token");
        }
    }



}

