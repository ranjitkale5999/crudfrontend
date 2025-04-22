package com.example.mapStruct.mapper;

import com.example.mapStruct.dto.StudentDto;
import com.example.mapStruct.entity.Student;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface StudentMapper {
    @Mappings({
            @Mapping(source = "studentName", target = "name"),
            @Mapping(source = "mobileNumbers", target = "mobileNumbers"),
            @Mapping(target = "addresses", source = "addresses")
    })
    StudentDto maptoStudentDto(Student student);

    @Mappings({@Mapping(source = "name", target ="studentName" ),
            @Mapping(source = "mobileNumbers", target = "mobileNumbers"),
            @Mapping(target = "addresses", source = "addresses")

    })
    @InheritInverseConfiguration
    Student maptoStudent(StudentDto studentDto);

    List<StudentDto> maptoStudentDtos(List<Student> students);
    List<Student> maptoStudent (List<StudentDto> studentDtos);
}

