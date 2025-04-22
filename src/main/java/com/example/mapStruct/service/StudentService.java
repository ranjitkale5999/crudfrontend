package com.example.mapStruct.service;

import com.example.mapStruct.dto.AddressDto;
import com.example.mapStruct.dto.MobileNumberDto;
import com.example.mapStruct.dto.StudentDto;
import com.example.mapStruct.entity.*;
import com.example.mapStruct.mapper.StudentMapper;
import com.example.mapStruct.repository.AddressRepo;
import com.example.mapStruct.repository.DepartmentRepo;
import com.example.mapStruct.repository.StudentRepository;
import com.example.mapStruct.repository.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.AttributeNotFoundException;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private DepartmentRepo departmentRepository;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private AddressRepo addressRepo;


//    @Transactional
//    public StudentDto addStudent(StudentDto studentDto) throws  Exception{
//        System.out.println("Received studentDto: " + studentDto);
//        Student student = studentMapper.maptoStudent(studentDto);
////        System.out.println("student DATA :- "+student);
//        if (student.getMobileNumbers() != null) {
//            student.getMobileNumbers().forEach(mobileNumber -> mobileNumber.setStudent(student));
//        }
//
//
//        if (studentDto.getDepartment() != null && studentDto.getDepartment().getId() != null) {
//            Department department = departmentRepository.findById(studentDto.getDepartment().getId())
//                    .orElseThrow(() -> new AttributeNotFoundException("Department not found with id " + studentDto.getDepartment().getId()));
//            student.setDepartment(department);
//        }
//
//
//
//        if (student.getTeachers() != null) {
//            List<Long> missingTeacherIds = new ArrayList<>();
//
//            Set<Teacher> managedTeachers = student.getTeachers().stream()
//                    .map(teacher -> {
//                        Optional<Teacher> optionalTeacher = teacherRepo.findById(teacher.getId());
//                        if (!optionalTeacher.isPresent()) {
//                            missingTeacherIds.add(teacher.getId());
//                            return null;
//                        }
//                        return optionalTeacher.get();
//                    })
//                    .filter(Objects::nonNull)
//                    .collect(Collectors.toSet());
//
//            if (!missingTeacherIds.isEmpty()) {
//                String ids = missingTeacherIds.stream()
//                        .map(String::valueOf)
//                        .collect(Collectors.joining(", "));
//                throw new IllegalArgumentException("Teacher not found with id " + ids);
//            }
//
//
//            student.setTeachers(managedTeachers);
//        }
//
////        System.out.println("Student Address :- "+ student.getAddresses());
//        if (student.getAddresses()!=null){
//            student.getAddresses().forEach(address -> address.setStudent(student));
//        }
//        Student savedStudent = studentRepository.save(student);
//        //DTO and return
//        return studentMapper.maptoStudentDto(savedStudent);
//    }




    @Transactional
    public StudentDto addStudent(StudentDto studentDto) throws Exception {
        System.out.println("Received studentDto: " + studentDto);
        Student student = studentMapper.maptoStudent(studentDto);
        List<String> errorMessages = new ArrayList<>();


        if (student.getMobileNumbers() != null) {
            student.getMobileNumbers().forEach(mobileNumber -> mobileNumber.setStudent(student));
        }


        if (studentDto.getDepartment() != null && studentDto.getDepartment().getId() != null) {
            Long deptId = studentDto.getDepartment().getId();
            Optional<Department> deptOpt = departmentRepository.findById(deptId);
            if (deptOpt.isPresent()) {
                student.setDepartment(deptOpt.get());
            } else {
                errorMessages.add("Department not found with id " + deptId);
            }
        }


        if (student.getTeachers() != null) {
            List<Long> missingTeacherIds = new ArrayList<>();

            Set<Teacher> managedTeachers = student.getTeachers().stream()
                    .map(teacher -> {
                        Optional<Teacher> optionalTeacher = teacherRepo.findById(teacher.getId());
                        if (!optionalTeacher.isPresent()) {
                            missingTeacherIds.add(teacher.getId());
                            return null;
                        }
                        return optionalTeacher.get();
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            if (!missingTeacherIds.isEmpty()) {
                String ids = missingTeacherIds.stream()
                        .map(String::valueOf)
                        .collect(Collectors.joining(", "));
                errorMessages.add("Teacher not found with id " + ids);
            }

            student.setTeachers(managedTeachers);
        }


        if (student.getAddresses() != null) {
            student.getAddresses().forEach(address -> address.setStudent(student));
        }


        if (!errorMessages.isEmpty()) {
            throw new IllegalArgumentException(String.join(" | ", errorMessages));
        }

        Student savedStudent = studentRepository.save(student);
        return studentMapper.maptoStudentDto(savedStudent);
    }

    public List<StudentDto> getAllStudent() {
        List<Student> students = studentRepository.findAll();
        return studentMapper.maptoStudentDtos(students);
    }

    public StudentDto getStudentById(long id) throws AttributeNotFoundException {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AttributeNotFoundException("Student not found with id " + id));

        return studentMapper.maptoStudentDto(student); // Mapping entity to DTO
    }

    public boolean deleteStudent(Long id) throws AttributeNotFoundException {
        Optional<Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            studentRepository.deleteById(id);
            return true; // Student was found and deleted
        } else {
            throw new AttributeNotFoundException("Student not found with ID: " + id);
        }
    }




    @Transactional
    public StudentDto updateStudent(Long id, StudentDto studentDto) throws AttributeNotFoundException {
        List<String> errorMessages = new ArrayList<>();
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AttributeNotFoundException("Student not found with id " + id));


        student.setStudentName(studentDto.getName());
        student.setAge(studentDto.getAge());





        if (studentDto.getDepartment() != null && studentDto.getDepartment().getId() != null) {
            Optional<Department> departmentOpt = departmentRepository.findById(studentDto.getDepartment().getId());
            if (departmentOpt.isPresent()) {
                student.setDepartment(departmentOpt.get());
            } else {
                errorMessages.add("Department not found with id " + studentDto.getDepartment().getId());
            }
        }


        if (studentDto.getTeachers() != null) {
            List<Long> missingTeacherIds = new ArrayList<>();

            Set<Teacher> teachers = studentDto.getTeachers().stream()
                    .map(teacherDto -> {
                        Optional<Teacher> optionalTeacher = teacherRepo.findById(teacherDto.getId());
                        if (!optionalTeacher.isPresent()) {
                            missingTeacherIds.add(teacherDto.getId());
                            return null;
                        }
                        return optionalTeacher.get();
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            if (!missingTeacherIds.isEmpty()) {
                String ids = missingTeacherIds.stream()
                        .map(String::valueOf)
                        .collect(Collectors.joining(", "));
                errorMessages.add("Teacher not found with id " + ids);
            }

            student.setTeachers(teachers);
        }

        // If any errors collected, throw them all at once
        if (!errorMessages.isEmpty()) {
            throw new IllegalArgumentException(String.join(" | ", errorMessages));
        }


        updateMobileNumbers(student, studentDto.getMobileNumbers());

        updateAddresses(student,studentDto.getAddresses());

        Student updatedStudent = studentRepository.save(student);
        return studentMapper.maptoStudentDto(updatedStudent);
    }





    private void updateMobileNumbers(Student student, List<MobileNumberDto> updatedNumbers) {
        if (updatedNumbers == null) {
            return;
        }

        List<MobileNumber> existingNumbers = student.getMobileNumbers();


        existingNumbers.removeIf(existing ->
                updatedNumbers.stream().noneMatch(updated ->
                        updated.getId() != null && updated.getId().equals(existing.getId()))
        );


        for (MobileNumberDto updatedNumberDto : updatedNumbers) {
            if (updatedNumberDto.getId() != null) {
                existingNumbers.stream()

                        .filter(existing -> existing.getId().equals(updatedNumberDto.getId()))
                        .findFirst()
                        .ifPresent(existing -> existing.setMobileNumber(updatedNumberDto.getMobileNumber()));
            } else {

                MobileNumber newMobile = new MobileNumber();
                newMobile.setMobileNumber(updatedNumberDto.getMobileNumber());
                newMobile.setStudent(student);
                existingNumbers.add(newMobile);
            }
        }
    }

    private  void updateAddresses(Student student, List<AddressDto> updateAddresses){
        if(updateAddresses==null){
            return;
        }
        List<Address> existingAddresses = student.getAddresses();

        existingAddresses.removeIf(existing ->updateAddresses.stream()
                .noneMatch(updated -> updated.getId()!=null && updated.getId().equals(existing.getId())));

        for (AddressDto updateaddressDto: updateAddresses){
            if (updateaddressDto.getId()!=null){
                existingAddresses.stream().
                        filter(existing-> existing.getId().equals(updateaddressDto.getId()))
                        .findFirst()
                        .ifPresent(existing -> {
                            existing.setArea(updateaddressDto.getArea());
                            existing.setCity(updateaddressDto.getCity());
                            existing.setPincode(updateaddressDto.getPincode());

                                });
            }
            else {
                   Address newAddress = new Address();
                newAddress.setArea(updateaddressDto.getArea());
                newAddress.setCity(updateaddressDto.getCity());
                newAddress.setPincode(updateaddressDto.getPincode());
                newAddress.setStudent(student);
                existingAddresses.add(newAddress);
            }
        }

    }



//    public List<Student> getStudentsByCriteria(String area, String city) {
//        return studentRepository.findStudentsByCustomCriteria(area, city);
//    }

    public List<StudentDto> getStudentsByCriteria(String area, String city){
        List<Student> students= studentRepository.findStudentsByCustomCriteria(area,city);

        return studentMapper.maptoStudentDtos(students) ;
    }
}
