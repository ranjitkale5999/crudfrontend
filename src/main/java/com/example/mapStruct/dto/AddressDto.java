package com.example.mapStruct.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
    private Long id;
    private String area;
    private String city;
    private Long pincode;


//    recurtion accoures (infinite)
//    private StudentDto student;

}
