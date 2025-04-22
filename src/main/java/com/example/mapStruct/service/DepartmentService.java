package com.example.mapStruct.service;

import com.example.mapStruct.dto.DepartmentDto;
import com.example.mapStruct.entity.Department;
import com.example.mapStruct.mapper.DepartmentMapper;
import com.example.mapStruct.repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepo departmentRepo;

    @Autowired
    private DepartmentMapper departmentMapper;

    public DepartmentDto addDepartment (DepartmentDto departmentDto){

        Department department=departmentMapper.maDepartment(departmentDto);
        Department departmentResponse= departmentRepo.save(department);

        DepartmentDto reponse=departmentMapper.mapDepartmentDto(departmentResponse);
        return reponse;
    }

    public List<DepartmentDto> getAllDepartment(){
        List<Department> departments=departmentRepo.findAll();
        return departmentMapper.maptoDepartmentDtos(departments);
    }


}
