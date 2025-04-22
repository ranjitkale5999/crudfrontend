import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';
import { Student } from '../../Class/student';
import { DepartmentService } from '../../Service/department.service';
import { Department } from '../../Class/department';

@Component({
    selector: 'app-addstud',
    templateUrl: './addstud.component.html',
    styleUrls: ['./addstud.component.css'],
    standalone: false
})
export class AddstudComponent implements OnInit {
  student: Student = new Student();
  departments: Department[] = [];
  
  obj: any;
  // selectedDepartment: Department  | null = null;
  selectedDepartment:any;
  constructor(
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private router: Router,
  ) {  }


  ngOnInit(): void {
    this.getDepartments();
  }

  selectDepartment(e:Event){
    console.log("dept",e)
    this.selectedDepartment = e
  }
   saveStudent() {
    this.student.department = this.selectedDepartment;
    console.log('payload : ', this.student)
    this.studentService.createStudent(this.student).subscribe(data => {
      console.log(data);
      this.goToStudent();
    }, error => {
      console.error('Error saving student', error);
    });
  }

  onSubmit() {
    this.saveStudent();
  }

  goToStudent() {
    this.router.navigate(['/stud']);
  }

  getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => {
      console.log(data);
      this.departments = data;

    });
  }

  

}