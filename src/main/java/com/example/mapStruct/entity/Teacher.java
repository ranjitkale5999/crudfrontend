package com.example.mapStruct.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "teachers")
@ToString(exclude = "students")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

//    @NotEmpty(message = "name is required")
//    @Size(min = 3, message = "Name should not be less than 3")
    private String name;

//    @NotEmpty(message = "subject is required")
//    @Size(min = 3, message = "subject should not be less than 3")
    private String subject;

    @ManyToMany(mappedBy = "teachers")
    @JsonBackReference
    private Set<Student> students = new HashSet<>();
}
