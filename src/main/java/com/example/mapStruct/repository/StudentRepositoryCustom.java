package com.example.mapStruct.repository;

import com.example.mapStruct.entity.Student;

import java.util.List;

public interface StudentRepositoryCustom {
    List<Student> findStudentsByCustomCriteria(String area, String city);
}
