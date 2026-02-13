package com.springbootproject.wealthtracker.error;

public class InvalidInputValueException extends RuntimeException {
    public InvalidInputValueException(String message) {
        super(message);
    }
}
