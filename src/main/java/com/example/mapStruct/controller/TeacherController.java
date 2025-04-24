package com.example.mapStruct.controller;

import com.example.mapStruct.Exceptions.ErrorResponse;
import com.example.mapStruct.dto.TeacherDto;
import com.example.mapStruct.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v3")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/teacher")
    public ResponseEntity<ErrorResponse<TeacherDto>> addTeacher(@Valid @RequestBody TeacherDto teacherDto) {
        TeacherDto savedTeacher = teacherService.addTeacher(teacherDto);

        ErrorResponse<TeacherDto> response = new ErrorResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                "Teacher created successfully",
                savedTeacher
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping(value = "/teacher/{id}")
    public ResponseEntity<ErrorResponse<?>> getByIdTeacher(@PathVariable Long id) {
        TeacherDto teachers = teacherService.getByIdTeachers(id);

        ErrorResponse<TeacherDto> response = new ErrorResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                "Teacher list fetched successfully",
                teachers
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/teacher")
    public ResponseEntity<ErrorResponse<List<TeacherDto>>> getAllTeacher() {
        List<TeacherDto> teachers = teacherService.getAllTeacher();

        ErrorResponse<List<TeacherDto>> response = new ErrorResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                "Teacher list fetched successfully",
                teachers
        );

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/teacher/{id}")
    public ResponseEntity<ErrorResponse<Object>> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);

        ErrorResponse<Object> response = new ErrorResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                "Teacher deleted successfully with ID: " + id,
                null
        );

        return ResponseEntity.ok(response);
    }


}