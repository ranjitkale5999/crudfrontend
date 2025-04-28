import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../Class/department';
import { Student } from '../../Class/student';
import { DepartmentService } from '../../Service/department.service';
import { StudentService } from '../../Service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeacherService } from '../../Service/teacher.service';
import { Teacher } from '../../Class/teacher';

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
  teachers:Teacher[]=[];
  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private router: Router,
    public dialogRef: MatDialogRef<StudupdateComponent>,   // ✅ Inject DialogRef
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private teacherService:TeacherService,
  ) {

  }

  ngOnInit(): void {
    // this.id=this.route.snapshot.params['id'];
    this.id = this.data.id; 
    this.regForm = this.fb.group({
      id: [this.student.id, Validators.required],
      name: [this.student.name, Validators.required],
      age: [this.student.age, Validators.required],
      department: [this.student.department, Validators.required],
      mobileNumbers: this.fb.array([],Validators.required),
      // teachers: this.fb.array([], Validators.required),
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
      teachers: [[], Validators.required]
    
    });

     this.studentService.getStudentById(this.id).subscribe(data => {
      this.student = data;
      console.log("Student by Id",data);
      this.regForm.patchValue({
        id: this.student.id,
        name: this.student.name,
        age: this.student.age,
        department: this.student.department ? this.student.department.id : null,
        teachers: this.student.teachers?.map(t => t.id) || []
        
      });

        // Populate mobile numbers
        this.setMobileNumbers(this.student.mobileNumbers);

        this.setAddresses(this.student.addresses);

    });

    this.getDepartments();
    this.getTeachers();
  }


  goToStudent() {
    // this.router.navigate(['/studrective']);
    this.dialogRef.close();
    this.router.navigate(['/studrective']).then(() => {
      window.location.reload();
    });
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

  
  // update(formdata: FormGroup) {
  //   if (formdata.valid) {
  //     console.log("Form Data:", formdata.value);
  
  //     // Construct the updated student object
  //     const updatedStudent: Student = {
  //       ...formdata.value,
  //       // department: { id: (this.selectedDepartment.id || formdata.value.department) }
  //       department: { id: (this.selectedDepartment?.id || formdata.value.department) }
  //     };
  
  //     console.log("Before Updated Student:", updatedStudent);
  //     this.student=updatedStudent;
  
  //     // Call the service to update the student
  //     this.studentService.updateStudent(this.id, this.student).subscribe(
  //       (data) => {
  //         console.log("Student updated successfully:", data);
  //         this.goToStudent();
  //       },
  //       (error) => {
  //         console.error("Error updating student:", error);
  //       }
  //     );
  //   } else {
  //     console.warn("Form is invalid. Please check the fields.");
  //   }
  // }
  update(formdata: FormGroup) {
    console.log("Form Data Out:", formdata.value);
    if (formdata.valid) {
      console.log("Form Data In:", formdata.value);
      // alert(JSON.stringify(this.student));
      const updatedStudent: Student = {
        ...formdata.value,
        department: this.regForm.value.department ? { id: this.regForm.value.department } : null,
        mobileNumbers: formdata.value.mobileNumbers.map((num: string, index: number) => ({
          id: this.student.mobileNumbers?.[index]?.id || null,
          mobileNumber: num
        })),
        teachers: this.regForm.value.teachers ?.map((id: number) => ({ id })) || [],
      };
      this.student = updatedStudent;
      this.studentService.updateStudent(this.id, this.student).subscribe(
        (data) => {
          this.goToStudent();
        },
        (error) => {
          console.error("Error updating student:", error);
        }
      );
    } else {
      this.checkFieldErrors(formdata);
      console.warn("Form is invalid. Please check the fields.");
    }
  }


checkFieldErrors(formdata: FormGroup) {
  Object.keys(formdata.controls).forEach((controlName) => {
    const control = formdata.get(controlName);
    if (control && control.invalid) {
      // Log invalid fields and the respective error
      console.log(`Field '${controlName}' is invalid.`);
      Object.keys(control.errors || {}).forEach((errorKey) => {
        console.log(`Error in '${controlName}': ${errorKey}`);
      });
    }
  });
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

// Populate mobile numbers in FormArray

get mobileNumbers(): FormArray {
  return this.regForm.get('mobileNumbers') as FormArray;
}
setMobileNumbers(mobileNumbers: any[]) {
  this.mobileNumbers.clear();

  mobileNumbers.forEach(m => {
    this.mobileNumbers.push(new FormControl(m.mobileNumber, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
  });

  if (mobileNumbers.length === 0) {
    this.mobileNumbers.push(new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
  }
}


addMobileNumber() {
  this.mobileNumbers.push(new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
}


removeMobileNumber(index: number) {
  if (this.mobileNumbers.length > 1) {
    this.mobileNumbers.removeAt(index);
    
  }
}

// Teacher

getTeachers() {

  this.teacherService.getTeacherList().subscribe(reponse => {
    console.log("Teacher List",reponse)
    this.teachers=reponse.data;
  })
}


// address
deleteAddress(val:any){
  if(this.addresses.length > 1) {
    this.addresses.removeAt(val);
 
}
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

get addresses (): FormArray {
  return this.regForm.get('addresses') as FormArray;
}

setAddresses(addresses: any[]) {
  this.addresses.clear();

  addresses.forEach(a => {
    this.addresses.push(this.fb.group({
      area: [a.area, Validators.required],
      city: [a.city, Validators.required],
      pincode: [a.pincode, [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]]
    }));
  });
  if (addresses.length === 0) {
    this.addresses.push(this.fb.group({
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: [null, [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]]
    }));   
  }

}


}
