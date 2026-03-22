package com.springbootproject.wealthtracker.enums;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AuthCookieType {
    JWT("jwt"),
    REFRESH("refreshToken");

    private final String value;

}
