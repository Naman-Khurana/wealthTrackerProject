package com.springbootproject.wealthtracker.error;

public class InvalidEmailFormatException extends RuntimeException{
    public InvalidEmailFormatException(String message) {
        super(message);
    }
}
