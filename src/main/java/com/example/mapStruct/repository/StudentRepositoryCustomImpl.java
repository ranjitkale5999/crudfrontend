package com.example.mapStruct.repository;

import com.example.mapStruct.entity.Address;
import com.example.mapStruct.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;

import java.util.List;

public class StudentRepositoryCustomImpl implements StudentRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Student> findStudentsByCustomCriteria(String area, String city) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<Student> query = cb.createQuery(Student.class);
        Root<Student> studentRoot = query.from(Student.class);

        Join<Student, Address> addressJoin = studentRoot.join("addresses", JoinType.LEFT);

        Predicate predicate = cb.conjunction();
        if (area != null && !area.isEmpty()) {
            predicate = cb.and(predicate, cb.equal(addressJoin.get("area"), area));
        }
        if (city != null && !city.isEmpty()) {
            predicate = cb.and(predicate, cb.equal(addressJoin.get("city"), city));
        }

        query.where(predicate);
        return entityManager.createQuery(query).getResultList();

    }

}