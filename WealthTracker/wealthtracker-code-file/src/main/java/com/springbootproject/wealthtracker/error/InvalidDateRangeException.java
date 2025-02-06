package com.springbootproject.wealthtracker.error;

public class InvalidDateRangeException extends RuntimeException{
    public InvalidDateRangeException(String message) {
        super(message);
    }
}
