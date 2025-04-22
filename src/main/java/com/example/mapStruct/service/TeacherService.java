package com.example.mapStruct.service;


import com.example.mapStruct.dto.StudentDto;
import com.example.mapStruct.dto.TeacherDto;
import com.example.mapStruct.entity.Student;
import com.example.mapStruct.entity.Teacher;
import com.example.mapStruct.mapper.TeacherMapper;
import com.example.mapStruct.repository.TeacherRepo;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.AttributeNotFoundException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepo teacherRepo;


    @Autowired
    private TeacherMapper teacherMapper;


    public TeacherDto addTeacher(TeacherDto teacherDto){

        Teacher teacher=teacherMapper.maptoTeacher(teacherDto);

        Teacher saveTeacher=teacherRepo.save(teacher);


        return teacherMapper.maptoTeacherDto(saveTeacher);
    }


    public List<TeacherDto> getAllTeacher(){
        List<Teacher> teachers= teacherRepo.findAll();
        return teacherMapper.maptoTeacherDtos(teachers);
    }

   public boolean deleteTeacher (Long id) throws AttributeNotFoundException {
       Optional<Teacher> teacher=teacherRepo.findById(id);
       if(teacher.isPresent()){
           teacherRepo.deleteById(id);
           return  true;
       }
       else {
           throw new AttributeNotFoundException("Student not found with ID:-"+id);

       }
   }
}
