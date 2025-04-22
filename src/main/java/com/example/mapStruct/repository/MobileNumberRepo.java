package com.example.mapStruct.repository;

import com.example.mapStruct.entity.MobileNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MobileNumberRepo extends JpaRepository<MobileNumber,Long> {
}
