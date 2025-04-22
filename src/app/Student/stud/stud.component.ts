import { Component, OnInit } from '@angular/core';
import { Student } from '../../Class/student';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stud',
    templateUrl: './stud.component.html',
    styleUrl: './stud.component.css',
    standalone: false
})
export class StudComponent implements OnInit {
  students: Student[] = [];
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents() {
    this.studentService.getStudentList().subscribe((data) => {
      console.log(data);
      this.students = data;
    });
  }
  delete(id: number) {
    this.studentService.deleteStudent(id).subscribe((data) => {
      //  console.log(data);
      this.getStudents();
    });
  }

  update(id: number) {
    this.router.navigate(['updatestud', id]);
  }
}
