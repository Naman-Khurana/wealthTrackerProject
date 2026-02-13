package com.springbootproject.wealthtracker.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = categoryValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME )
public @interface CategoryValidation {

    String message() default "Invalid Category Selected. Please choose a Valid one";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
