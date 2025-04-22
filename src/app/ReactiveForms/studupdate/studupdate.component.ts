import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../Class/department';
import { Student } from '../../Class/student';
import { DepartmentService } from '../../Service/department.service';
import { StudentService } from '../../Service/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studupdate',
  standalone: false,
  templateUrl: './studupdate.component.html',
  styleUrl: './studupdate.component.css'
})
export class StudupdateComponent {
  id:number=0;
  obj: any;
  // regForm!: FormGroup;
  regForm!: any;
  departments: Department[] = [];
  student: Student = new Student();
  selectedDepartment: any;
  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.regForm = this.fb.group({
      id: [this.student.id, Validators.required],
      name: [this.student.name, Validators.required],
      age: [this.student.age, Validators.required],
      department: [this.student.department, Validators.required],
      mobileNumbers: this.fb.array(
        this.student.mobileNumbers  // this.student.mobileNumbers && this.student.mobileNumbers.length > 0
          ? this.student.mobileNumbers.map(m => new FormControl(m.mobileNumber, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]))
          : [new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)])]
      )
    });

     this.studentService.getStudentById(this.id).subscribe(data => {
      this.student = data;
      console.log("Student by Id",data);
      this.regForm.patchValue({
        id: this.student.id,
        name: this.student.name,
        age: this.student.age,
        department: this.student.department.id,
        mobileNumbers:this.student.mobileNumbers
    
        
        // department: { id: this.selectedDepartment }
        
      });
    });

    this.getDepartments();
  }


  goToStudent() {
    this.router.navigate(['/studrective']);
  }

  getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => {
      // console.log(data);
      this.departments = data;

    });
  }

  selectDepartment(e: Event) {

    this.selectedDepartment = e
    console.log("selectDepartment",e);
  }

  
  update(formdata: FormGroup) {
    if (formdata.valid) {
      console.log("Form Data:", formdata.value);
  
      // Construct the updated student object
      const updatedStudent: Student = {
        ...formdata.value,
        // department: { id: (this.selectedDepartment.id || formdata.value.department) }
        department: { id: (this.selectedDepartment?.id || formdata.value.department) }
      };
  
      console.log("Before Updated Student:", updatedStudent);
      this.student=updatedStudent;
  
      // Call the service to update the student
      this.studentService.updateStudent(this.id, this.student).subscribe(
        (data) => {
          console.log("Student updated successfully:", data);
          this.goToStudent();
        },
        (error) => {
          console.error("Error updating student:", error);
        }
      );
    } else {
      console.warn("Form is invalid. Please check the fields.");
    }
  }
  


reset(){
  this.regForm.reset({
    department: this.regForm.get('department')?.value
  })
}



//  ARRAY FORM IN REACTIVEFORM

addmore(){
  this.regForm.get('mobileNumbers').push(
    // new FormControl()
    new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)])
   );
}

deleterow(val:any){
  this.regForm.get('mobileNumbers').removeAt(val);
}

}
