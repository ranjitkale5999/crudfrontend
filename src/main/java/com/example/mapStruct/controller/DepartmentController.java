package com.example.mapStruct.controller;

import com.example.mapStruct.dto.DepartmentDto;
import com.example.mapStruct.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v2")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/department")
    public DepartmentDto addDepartment(@RequestBody DepartmentDto departmentDto){
        return  departmentService.addDepartment(departmentDto);
    }

    @GetMapping(value = "/department")
    public List<DepartmentDto> getAllDepartment(){
        return departmentService.getAllDepartment();
    }



}
