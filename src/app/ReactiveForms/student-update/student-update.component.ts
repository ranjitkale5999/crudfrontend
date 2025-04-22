import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../Class/department';
import { Student } from '../../Class/student';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../Service/department.service';
import { StudentService } from '../../Service/student.service';
import { stringify } from 'flatted';
import { TeacherService } from '../../Service/teacher.service';
import { Teacher } from '../../Class/teacher';

@Component({
  selector: 'app-student-update',
  standalone: false,
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.css'
})
export class StudentUpdateComponent implements OnInit {
  id: number = 0;
  regForm!: FormGroup;
  departments: Department[] = [];
  student: Student = new Student();
  selectedDepartment: any;
  deleteSelections: boolean[] = [];
  teachers:Teacher[]=[];
  selectedTeachers:any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private teacherService:TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // Initialize the form
    this.regForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      department: ['', Validators.required],
      mobileNumbers: this.fb.array([]), // FormArray for mobile numbers
      // teachers:this.fb.array([]),
      teachers: this.fb.control([], Validators.required),
      addresses: this.fb.array([
        this.fb.group({
          area: ['', Validators.required],
          city: ['', Validators.required],
          pincode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
        })
      ])

    });

    // Fetch student details by ID and populate the form
    this.studentService.getStudentById(this.id).subscribe(data => {
      this.student = data;
      console.log("Student by Id", data);

      this.regForm.patchValue({
        id: this.student.id,
        name: this.student.name,
        age: this.student.age,
        department: this.student.department.id,
         teachers: this.student.teachers.map(t => t.id),
         
      });

      // Populate mobile numbers
      this.setMobileNumbers(this.student.mobileNumbers);
      this.setAddresses(this.student.addresses);


      this.selectedTeachers = this.student.teachers.map(t => t.id); // For keeping track separately if needed
    });

    this.getDepartments();
    this.getTeachers();
  }

  // Getter for mobileNumbers FormArray
  get mobileNumbers(): FormArray {
    return this.regForm.get('mobileNumbers') as FormArray;
  }

  getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => {
      this.departments = data;
    });
  }

  selectDepartment(e: any) {
    this.selectedDepartment = e;
    console.log("Selected Department:", e);
  }

  // Populate mobile numbers in FormArray
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

  update(formdata: FormGroup) {
    this.allValidation(formdata);

    // alert(JSON.stringify(formdata.value));
    // alert(JSON.stringify(formdata.valid));
    
    

    if (formdata.valid) {
      // console.log("Form Data:", formdata.value);
      // alert(JSON.stringify(this.student));
      const updatedStudent: Student = {
        ...formdata.value,
        department: { id: (this.selectedDepartment?.id || formdata.value.department) },
        // mobileNumbers: formdata.value.mobileNumbers.map((id:number,num: string) => ({ id:id,mobileNumber: num }))
        mobileNumbers: formdata.value.mobileNumbers.map((num: string, index: number) => ({
          id: this.student.mobileNumbers?.[index]?.id || null,
          mobileNumber: num
        })),

        addresses: formdata.value.addresses.map((addr: any, index: number) => ({
          id: this.student.addresses?.[index]?.id || null,
          area: addr.area,
          city: addr.city,
          pincode: addr.pincode
        })),
        teachers: formdata.value.teachers.map((id: number) => ({ id }))
      };

      console.log("Before Updated Student:", updatedStudent);
      this.student = updatedStudent;

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

  goToStudent() {
    this.router.navigate(['/studrective']);
  }

  reset() {
    this.regForm.reset({
      // name: this.regForm.get('name')?.value,
      age: this.regForm.get('age')?.value,
      department: this.regForm.get('department')?.value,
      mobileNumbers: this.regForm.get('mobileNumbers')?.value
    });
  }

// Teacher
getTeachers() {

  this.teacherService.getTeacherList().subscribe(data => {
    // console.log("Teacher List",data)
    this.teachers=data;
  })
}

selectTeacher(e: Event) {
  // console.log("Selected teacher :-", e)
  this.selectedTeachers = e
}

// Addresses
get addresses():FormArray{
  return this.regForm.get('addresses')as FormArray;
}

  // Populate addresses
  setAddresses(addresses:any[]){

    this.addresses.clear();

    addresses.forEach(a=>{
      this.addresses.push(
        this.fb.group({

          area: [a.area, Validators.required],
          city: [a.city, Validators.required],
          pincode: [a.pincode, [
            Validators.required,
            Validators.pattern(/^[0-9]{6}$/)
          ]]
        })
      )
    });
    
    
    if(addresses.length==0){
      this.addresses.push(
        this.fb.group({
          area: ['', Validators.required],
          city: ['', Validators.required],
          pincode: [null, [
            Validators.required,
            Validators.pattern(/^[0-9]{6}$/)
          ]]
        })
      )
    }

  }



 
  

addAddress(){
  this.addresses.push(
    this.fb.group({
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: [null, [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]]
    })
  )

}


deleteAddress(index:number){
  if(this.addresses.length>1){
   this.addresses.removeAt(index);
  }
}

allValidation(formdata:FormGroup){
 
  const validFields: string[] = [];
const invalidFields: string[] = [];


Object.keys(formdata.controls).forEach((key) => {
  const control = formdata.get(key);

  // For FormArrays like addresses or mobileNumbers, validate each child
  if (control instanceof FormArray) {
    control.controls.forEach((subControl, index) => {
      if (subControl.valid) {
        validFields.push(`${key}[${index}]`);
      } else {
        invalidFields.push(`${key}[${index}]`);
      }
    });
  } 
  // For normal FormControls
  else if (control?.valid) {
    validFields.push(key);
  } else {
    invalidFields.push(key);
  }
});


// alert("✅ Valid Fields:\n" + validFields.join(", "));
// alert("❌ Invalid Fields:\n" + invalidFields.join(", "));


console.log("Valid Fields:", validFields);
console.log("Invalid Fields:", invalidFields);

if (formdata.valid) {
  // your update logic here...
  console.log("Form is overall valid. Proceeding...");
} else {
  console.warn("Form is invalid. Fix highlighted fields.");
}

 
}

}


