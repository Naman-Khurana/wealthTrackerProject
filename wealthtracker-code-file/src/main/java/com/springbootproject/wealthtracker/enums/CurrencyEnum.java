package com.springbootproject.wealthtracker.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CurrencyEnum {
    INR("INR");

    private final String value;
}
