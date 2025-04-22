package com.example.mapStruct.service;

import com.example.mapStruct.dto.AddressDto;
import com.example.mapStruct.entity.Address;
import com.example.mapStruct.mapper.AddressMapper;
import com.example.mapStruct.repository.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private AddressMapper addressMapper;

   public AddressDto addAddress(AddressDto addressDto){
       Address address=addressMapper.maptoAddress(addressDto);

       Address saveAddress =addressRepo.save(address);

        return addressMapper.maptoAddressDto(saveAddress);
    }

    public List<AddressDto> getAllAddress(){
        List<Address> addresses=addressRepo.findAll();

       return addressMapper.maptoAddressDtos(addresses);
    }



}
