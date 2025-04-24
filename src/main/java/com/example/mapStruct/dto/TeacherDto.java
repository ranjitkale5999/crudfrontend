package com.example.mapStruct.dto;


import lombok.Data;

import javax.validation.constraints.*;
import java.util.HashSet;
import java.util.Set;

@Data
public class TeacherDto {

    private Long id;
    @NotEmpty(message = "name is required")
    @Size(min = 3, max = 20, message = "Name size should be between 3 to 20 char..")
    private String name;

    @NotEmpty(message = "subject is required")
    @Size(min = 3, message = "subject should not be less than 3")
    private String subject;

//private Set<StudentDto> students = new HashSet<>();
}
