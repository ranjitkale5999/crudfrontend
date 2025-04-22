import { Component } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../Class/student';
import { Department } from '../../Class/department';
import { DepartmentService } from '../../Service/department.service';
// import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
    selector: 'app-updatestud',
    templateUrl: './updatestud.component.html',
    styleUrl: './updatestud.component.css',
    standalone: false
})
export class UpdatestudComponent {
  id:number=0;
  students: Student[] = [];
  departments: Department[] = [];
  student:Student=new Student();
  obj: any;
  selectedDepartment:any;
  constructor(private route:ActivatedRoute,
    private studentService:StudentService,
    private departmentService: DepartmentService,
    private router:Router){ }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.studentService.getStudentById(this.id).subscribe(data=>{
      this.student=data;
      this.obj = this.student.department.id;
      console.log("student" ,this.student)
    })
    this.getDepartments();
  }

  selectDepartment(e:Event){
    // console.log("dept",e)
    this.selectedDepartment = e
  }
onSubmit(){
  
  this.student.department = this.selectedDepartment;
  this.studentService.updateStudent(this.id ,this.student).subscribe(data=>{
        // console.log(data);
        this.goToStudent();
      })
}

goToStudent(){
  this.router.navigate(['/stud'])
}

getDepartments() {
  this.departmentService.getDepartmentList().subscribe(data => {
    // console.log(data);
    this.departments = data;
  });
}


}
