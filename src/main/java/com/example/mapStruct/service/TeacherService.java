package com.example.mapStruct.service;


import com.example.mapStruct.Exceptions.InvalidInputException;
import com.example.mapStruct.Exceptions.InvalidInputException;
import com.example.mapStruct.dto.TeacherDto;
import com.example.mapStruct.entity.Teacher;
import com.example.mapStruct.mapper.TeacherMapper;
import com.example.mapStruct.repository.TeacherRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepo teacherRepo;


    @Autowired
    private TeacherMapper teacherMapper;


    public TeacherDto addTeacher(TeacherDto teacherDto) {

        Teacher teacher = teacherMapper.maptoTeacher(teacherDto);

        Teacher saveTeacher = teacherRepo.save(teacher);


        return teacherMapper.maptoTeacherDto(saveTeacher);
    }

    public TeacherDto getByIdTeachers(long id) {
        Teacher teacher = teacherRepo.findById(id)
                .orElseThrow(() -> new InvalidInputException("Teacher not found with ID" + id));
        return teacherMapper.maptoTeacherDto(teacher);
    }

    public List<TeacherDto> getAllTeacher() {
//        List<Teacher> teachers = new ArrayList<>();
        List<Teacher> teachers = teacherRepo.findAll();
        if (teachers.isEmpty()) {
            throw new InvalidInputException("Teachers not found");
        }
        return teacherMapper.maptoTeacherDtos(teachers);
    }


    public void deleteTeacher(Long id) {
        Teacher teacher = teacherRepo.findById(id)
                .orElseThrow(() -> new InvalidInputException("Teacher not found with ID: " + id));

        teacherRepo.delete(teacher);
    }


    public TeacherDto updateTeacher(Long id, TeacherDto teacherDto) {
        Teacher teacher = teacherRepo.findById(id)
                .orElseThrow(() -> new InvalidInputException("Teacher not found with ID:- " + id));

        teacher.setName(teacherDto.getName());
        teacher.setSubject(teacherDto.getSubject());

        Teacher updateTeacher = teacherRepo.save(teacher);
        return teacherMapper.maptoTeacherDto(updateTeacher);
    }

}
