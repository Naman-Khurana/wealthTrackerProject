package com.springbootproject.wealthtracker.error;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;

public class jwtTokenExpirationException extends ExpiredJwtException {
    public jwtTokenExpirationException(Header header, Claims claims, String message) {
        super(header, claims, message);
    }
}
