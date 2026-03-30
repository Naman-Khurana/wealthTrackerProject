package com.springbootproject.wealthtracker.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TimeZoneEnum {
    ASIA_KOLKATA("Asia/Kolkata");

    public final String value;
}
