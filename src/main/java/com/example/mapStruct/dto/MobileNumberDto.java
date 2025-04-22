package com.example.mapStruct.dto;

import com.example.mapStruct.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MobileNumberDto {
    private Long id;
    private String mobileNumber;
//    private Student student;
}