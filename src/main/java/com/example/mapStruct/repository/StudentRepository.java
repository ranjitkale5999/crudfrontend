package com.example.mapStruct.repository;

import com.example.mapStruct.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

    public interface StudentRepository extends JpaRepository<Student,Long> ,StudentRepositoryCustom {
}
