package com.springbootproject.wealthtracker.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@RestControllerAdvice
public class GlobalExceptionHandler {

    DateTimeFormatter formatter= DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDTO> handleResourceNotFound(AccessDeniedException e, WebRequest request){
        ErrorResponseDTO response=new ErrorResponseDTO();
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setMessage("You are not allowed to access this page's content.");
        response.setTimestamp(LocalDateTime.now().format(formatter));
        response.setPath(request.getDescription(false));
        return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(InvalidCategoryException.class)
    public ResponseEntity<ErrorResponseDTO> HandleInvalidCategoryException(InvalidCategoryException e, WebRequest request){
        ErrorResponseDTO response=new ErrorResponseDTO();
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(LocalDateTime.now().format(formatter));
        response.setPath(request.getDescription(false));
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> HandleStockNotFoundException(NotFoundException e, WebRequest request){
        ErrorResponseDTO response=new ErrorResponseDTO();
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(LocalDateTime.now().format(formatter));
        response.setPath(request.getDescription(false));
        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidEmailFormatException.class)
    public ResponseEntity<ErrorResponseDTO> HandleStockNotFoundException(InvalidEmailFormatException e, WebRequest request){
        ErrorResponseDTO response=new ErrorResponseDTO();
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(LocalDateTime.now().format(formatter));
        response.setPath(request.getDescription(false));
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> HandleStockNotFoundException(AlreadyExistsException e, WebRequest request){
        ErrorResponseDTO response=new ErrorResponseDTO();
        response.setStatus(HttpStatus.CONFLICT.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(LocalDateTime.now().format(formatter));
        response.setPath(request.getDescription(false));
        return new ResponseEntity<>(response,HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidDateRangeException.class)
    public ResponseEntity<ErrorResponseDTO> HandleInvalidDateRangeException(InvalidDateRangeException e, WebRequest request){
        ErrorResponseDTO response=new ErrorResponseDTO();
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(LocalDateTime.now().format(formatter));
        response.setPath(request.getDescription(false));
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler(HttpServerErrorException.InternalServerError.class)
//    public ResponseEntity<ErrorResponseDTO> InternalServerError(HttpServerErrorException.InternalServerError e,HttpServletRequest request){
//        ErrorResponseDTO response=new ErrorResponseDTO();
//        response.setStatus(HttpStatus.FORBIDDEN.value());
//        response.setMessage("You are not allowed to access this page's content due to internal server error.");
//        response.setTimestamp(LocalDateTime.now().format(formatter));
//        response.setPath(request.getRequestURI());
//        return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ErrorResponseDTO> handleGeneralExceptions(Exception e,HttpServletRequest request){
//        ErrorResponseDTO response=new ErrorResponseDTO();
//        response.setStatus(HttpStatus.FORBIDDEN.value());
//        response.setMessage(e.getMessage());
//        response.setTimestamp(LocalDateTime.now().format(formatter));
//        response.setPath(request.getRequestURI());
//        return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
//    }
}
