package com.example.mapStruct.Exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse<T> {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private T data;

}
