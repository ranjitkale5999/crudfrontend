package com.example.mapStruct.mapper;

import com.example.mapStruct.dto.AddressDto;
import com.example.mapStruct.entity.Address;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AddressMapper {
    AddressDto maptoAddressDto(Address address);

    Address maptoAddress(AddressDto addressDto);
    @InheritInverseConfiguration
    List<AddressDto> maptoAddressDtos (List<Address> addresses);
    List<Address> maptoAddresses(List<AddressDto>addressDtos);
}
