package com.example.mapStruct.controller;

import com.example.mapStruct.dto.ApiResponse;
import com.example.mapStruct.dto.StudentDto;
import com.example.mapStruct.entity.Student;
import com.example.mapStruct.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.AttributeNotFoundException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/student")

    public ResponseEntity<?> addStudent(@RequestBody(required = false) StudentDto studentDto) {
        // Manual null check
        if (studentDto == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Student cannot be null");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            StudentDto savedStudent = studentService.addStudent(studentDto);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Split multiple errors by " | " and return as list
            Map<String, Object> response = new HashMap<>();
            response.put("errors", Arrays.asList(e.getMessage().split(" \\| ")));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    @GetMapping(value = "/student")
    public List<StudentDto> getAllStudent() {
        return studentService.getAllStudent();
    }

    @GetMapping(value = "/student/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable long id) {
        try {
            StudentDto studentDto = studentService.getStudentById(id);
            return ResponseEntity.ok(studentDto);
        } catch (AttributeNotFoundException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @DeleteMapping(value = "/student/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id) {
        Map<String, Boolean> response = new HashMap<>();
        try {
            boolean isDeleted = studentService.deleteStudent(id);
            response.put("Deleted", isDeleted);
            return ResponseEntity.ok(response);
        } catch (AttributeNotFoundException e) {
            response.put("Deleted", false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


//    @PutMapping(value = "/student/{id}")
//    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody StudentDto studentDto) {
//        try {
//            StudentDto updatedStudent = studentService.updateStudent(id, studentDto);
//            return ResponseEntity.ok(updatedStudent);
//        }
//        catch (Exception e) {
//            Map<String, String> response = new HashMap<>();
//            response.put("error", "Unexpected error: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//
//    }

    @PutMapping("/student/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody StudentDto studentDto) {
        try {
            StudentDto updatedStudent = studentService.updateStudent(id, studentDto);
            return ResponseEntity.ok(updatedStudent);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();


            if (e.getMessage() != null && e.getMessage().contains(" | ")) {
                response.put("errors", Arrays.asList(e.getMessage().split(" \\| ")));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            if (e instanceof AttributeNotFoundException) {
                response.put("error", e.getMessage());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            response.put("error", "Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    @GetMapping("/student/criteria")
     //    public List<Student> getStudents(@PathVariable(value = "area", required = false) String area, @PathVariable(value="city", required = false) String city)
    public ResponseEntity<ApiResponse<List<StudentDto>>> getStudents(
            @RequestParam(value = "area", required = false) String area,
            @RequestParam(value = "city", required = false) String city) {

        if (city == null || city.trim().isEmpty()) city = "";
        if (area == null || area.trim().isEmpty()) area = "";

        List<StudentDto> students = studentService.getStudentsByCriteria(area, city);

        ApiResponse<List<StudentDto>> response = new ApiResponse<>();
        response.setStatus(students.isEmpty() ? 404 : 200);
        response.setMessage(students.isEmpty()
                ? "No students found for area: " + area + " and city: " + city
                : "Students fetched successfully");
        response.setData(students);
System.out.println(response);
        return new ResponseEntity<>(response, students.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }


}

