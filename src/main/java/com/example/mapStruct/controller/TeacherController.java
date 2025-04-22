package com.example.mapStruct.controller;

//import com.example.mapStruct.dto.FieldErrorDTO;
import com.example.mapStruct.dto.FieldErrorDTO;
import com.example.mapStruct.dto.StudentDto;
import com.example.mapStruct.dto.TeacherDto;
import com.example.mapStruct.service.TeacherService;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.management.AttributeNotFoundException;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v3")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/teacher")
    public ResponseEntity<?> addTeacher(
            @Valid @RequestBody TeacherDto teacherDto,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            List<FieldErrorDTO> errors = bindingResult.getFieldErrors().stream()
                    .map(fe -> new FieldErrorDTO(fe.getField(), fe.getDefaultMessage()))
                    .collect(Collectors.toList());
            return ResponseEntity
                    .badRequest()
                    .body(errors);
        }

        TeacherDto saved = teacherService.addTeacher(teacherDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }
   @GetMapping(value = "/teacher")
    public List<TeacherDto>getAllTeacher(){
        return teacherService.getAllTeacher();
   }

   @DeleteMapping(value = "/teacher/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteTeacer(@Valid @PathVariable Long id){
        Map<String,Boolean> reponse =new HashMap<>();

        try {
            boolean isDeleted=teacherService.deleteTeacher(id);
            reponse.put("Deleted",isDeleted);
            return  ResponseEntity.ok(reponse);
        }
        catch (AttributeNotFoundException e){
            reponse.put("Deleted",false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(reponse);

        }
   }
}
