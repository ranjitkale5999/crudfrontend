package com.example.mapStruct.entity;

import com.fasterxml.jackson.databind.ser.impl.PropertySerializerMap;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name ="department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;


}

