import { Component } from '@angular/core';
import { Student } from '../../Class/student';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Address } from '../../Class/address';
import { AddressService } from '../../Service/address.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudupdateComponent } from '../studupdate/studupdate.component';
import { StudentUpdateComponent } from '../student-update/student-update.component';
import { StudaddComponent } from '../studadd/studadd.component';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-studreactive',
  standalone: false,
  templateUrl: './studreactive.component.html',
  styleUrl: './studreactive.component.css'
})
export class StudreactiveComponent {
  students: Student[] = [];
  formsearch!: FormGroup;
  addresses: Address[] = [];

  pagedStudents: Student[] = [];
   pageSize = 5;
   currentPage = 0;
   totalStudents = 0;
  constructor(
    private studentService: StudentService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      area: [''],
      city: ['']
    }, { validators: this.onlyOneFieldValidator() });

    this.getStudents();
    this.getAddress();
  }
  getStudents() {
    this.studentService.getStudentList().subscribe((data) => {
      console.log("Student List :-",data);
      this.students = data;
      this.totalStudents = this.students.length;
      this.updatePagedStudents();
    });
  }
  delete(id: number) {
    this.studentService.deleteStudent(id).subscribe((data) => {
      //  console.log(data);
      this.getStudents();
    });
  }

  update(id: number) {
    // this.router.navigate(['studUpdate', id]);
    const dialogRef = this.dialog.open(StudupdateComponent, {
     
      width:'50%',
      height: '90%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '900ms',
      data: { id: id }, // 👈 pass id to dialog
    });
  }
 
  // Address List
  uniqueAreas: string[] = [];
  uniqueCities: string[] = [];
  getAddress() {
    this.addressService.getAddressList().subscribe((data) => {
      console.log("Address List :-", data);
      this.addresses = data;
      this.uniqueAreas = [...new Set(data.map(a => a.area))];
      this.uniqueCities = [...new Set(data.map(a => a.city))];
    });
  }


  searchCA(formsearch: FormGroup) {
    console.log("Invalid",formsearch.invalid)
    const { area, city } = this.formsearch.value;
    console.log("data:- ",  formsearch.value);
    this.studentService.getStudentsByCriteria(area, city).subscribe(
      (response) => {
      console.log("Search API Response (criteria):", response);
      this.students = response.data;
    },
      (error) => {
        // console.error("Error during search:", error);
        if (error.status === 404) {
          alert(error.error.message || "No data found .");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }

      }
    );
  }

  resetSearch() {
    this.formsearch.reset();
    this.getStudents();
  }

  onlyOneFieldValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const area = group.get('area')?.value;
      const city = group.get('city')?.value;
      return area || city ? null : { atLeastOne: true };
    };
  

}

// Dialog Box
dataFromDialog: any;


showPrompt(): void {
  const dialogRef = this.dialog.open(StudaddComponent, {
    width:'50%',
    height: '90%',
    enterAnimationDuration: '500ms', 
   exitAnimationDuration: '900ms',
  });

}

// Pagination
updatePagedStudents() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  // this.students = this.students.slice(startIndex, endIndex);
  this.pagedStudents = this.students.slice(startIndex, endIndex);
}

onPageChange(event: PageEvent) {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.updatePagedStudents();
}


}
