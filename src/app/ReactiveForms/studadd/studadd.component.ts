import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../Class/department';
import { DepartmentService } from '../../Service/department.service';
import { Student } from '../../Class/student';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';
import { TeacherService } from '../../Service/teacher.service';
import { Teacher } from '../../Class/teacher';

@Component({
  selector: 'app-studadd',
  standalone: false,
  templateUrl: './studadd.component.html',
  styleUrl: './studadd.component.css'
})
export class StudaddComponent {
  // regForm!: FormGroup;
  regForm!: any;
  departments: Department[] = [];
  student: Student = new Student();
  selectedDepartment: any;
  selectedTeachers:any;

  teachers:Teacher[]=[];
  
  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private teacherService:TeacherService,
    private studentService: StudentService,
    private router: Router,
  ) {

  }

  ngOnInit() {


   
      this.regForm = this.fb.group({
        id: [this.student.id, Validators.required],
        name: [this.student.name, Validators.required],
        age: [this.student.age, Validators.required],
        department: [this.student.department, Validators.required],
        mobileNumbers: this.fb.array(
                      // this.student.mobileNumbers.map(m => new FormControl(m.mobileNumber, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]))
                       [new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)])]
        ),
        addresses: this.fb.array([
          this.fb.group({
            area: ['', Validators.required],
            city: ['', Validators.required],
            pincode: [null, [  
              Validators.required,
              Validators.pattern(/^[0-9]{6}$/)
            ]]
          })
        ]),
        teachers:[this.student.teachers,Validators.required],

      });
 

    this.getDepartments();
    this.getTeachers();
  }


  goToStudent() {
    this.router.navigate(['/studrective']);
  }

  // Departent
  getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => {
      // console.log(data);
      this.departments = data;

    });
  }

  selectDepartment(e: Event) {
    // console.log("dept", e)
    this.selectedDepartment = e
  }

  register(formdata: FormGroup) {

    console.log( "form Data in register:-",formdata.value); //by reference
    console.log(formdata.valid);

    this.saveStudent();
  }
  saveStudent() {
    this.student = { 
      ...this.regForm.value, 
      department: { id: this.selectedDepartment.id },
   
      mobileNumbers: this.regForm.value.mobileNumbers.map((num: string) => ({ mobileNumber: num })),
      teachers: this.selectedTeachers.map((teacher: any) => ({ id: teacher.id })),
      
    };
  
    console.log('Payload:', this.student);
    // alert(JSON.stringify(this.student));
    
    this.studentService.createStudent(this.student).subscribe(data => {
      console.log('Student saved successfully:', data);
      this.goToStudent();
    }, error => {
      console.error('Error saving student:', error);
    });
  }

reset(){
  // this.regForm.reset(); 
  this.regForm.reset({

    lname: this.regForm.get('lname')?.value
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

// Teacher 
 getTeachers() {

  this.teacherService.getTeacherList().subscribe(data => {
    console.log("Teacher List",data)
    this.teachers=data;
  })
}

selectTeacher(e: Event) {
  // console.log("Selected teacher :-", e)
  this.selectedTeachers = e
}

// Addresses
deleteAddress(val:any){
  this.regForm.get('addresses').removeAt(val);
}

addAddress() {
  const addressForm = this.fb.group({
    area: ['', Validators.required],
    city: ['', Validators.required],
    pincode: [null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/)
    ]]
  });

  (this.regForm.get('addresses') as FormArray).push(addressForm);
}

}
