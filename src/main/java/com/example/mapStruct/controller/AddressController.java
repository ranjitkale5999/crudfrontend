package com.example.mapStruct.controller;

import com.example.mapStruct.dto.AddressDto;

import com.example.mapStruct.dto.StudentDto;
import com.example.mapStruct.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v4")
public class AddressController {


    @Autowired
    public AddressService addressService;

    @PostMapping(value = "/address")
    public ResponseEntity<AddressDto> addStudent(@RequestBody AddressDto addressDto){
        AddressDto saveAddress= addressService.addAddress(addressDto);
        return new ResponseEntity<>(saveAddress,HttpStatus.CREATED);
    }

//    @PostMapping(
//            value = "/address",
//            consumes = MediaType.APPLICATION_JSON_VALUE,
//            produces = MediaType.APPLICATION_JSON_VALUE
//    )
//    public ResponseEntity<AddressDto> addStudent(@RequestBody AddressDto addressDto){
//        AddressDto saveAddress = addressService.addAddress(addressDto);
//        return new ResponseEntity<>(saveAddress, HttpStatus.CREATED);
//    }




    @GetMapping(value = "/address")
    public  List<AddressDto> getAllAddress(){
        return addressService.getAllAddress();
    }

}
