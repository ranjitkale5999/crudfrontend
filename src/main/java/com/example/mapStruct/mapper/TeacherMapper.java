package com.example.mapStruct.mapper;

import com.example.mapStruct.dto.TeacherDto;
import com.example.mapStruct.entity.Teacher;
import org.mapstruct.*;

import java.util.List;
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TeacherMapper {

    TeacherDto maptoTeacherDto(Teacher teacher);
    @InheritInverseConfiguration
    Teacher maptoTeacher(TeacherDto teacherDto);


    List<TeacherDto>maptoTeacherDtos(List<Teacher>teachers);
    List<Teacher>maptoTeachers(List<TeacherDto>teacherDtos);



}
