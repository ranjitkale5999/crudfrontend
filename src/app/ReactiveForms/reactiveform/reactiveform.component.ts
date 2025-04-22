import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  standalone: false,
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent {
//  regForm!:FormGroup;
 regForm:any;

 constructor(private _fb: FormBuilder){

 }

 ngOnInit(){

  //1
    // this.regForm=new FormGroup({
    //   id:new FormControl(),
    //   fname:new FormControl(),
    //   lname:new FormControl(),
    //   email:new FormControl(),
    //   mobileno:new FormControl(),
    // })

    //2
    // this.regForm=this._fb.group({
    //   id:new FormControl(),
    //   fname:new FormControl('ranjit'),
    //   lname:new FormControl(),
    //   email:new FormControl(),
    //   mobileno:new FormControl(98877653),
    // })

    this.regForm=this._fb.group({
      // id:['9',Validators.required],
      id:['',Validators.required],
      fname:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]+$/)])],
      // fname:['',[(Validators.required,Validators.pattern(/^[a-zA-Z]+$/))]],
      // fname:['Ranjit',Validators.required],
      lname:['',Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(10)])],
      email:['',[Validators.required,Validators.email]],
      // email:['rk@gmail.com',[Validators.required,Validators.email]],
    
      // mobileno:['',Validators.required],

      mobilesno:new FormArray([
        // new FormControl()
        new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)])
      ])
    


    })
 }

 register(formdata:FormGroup){

  console.log(formdata.value); //by reference
  console.log(formdata.valid)

  // console.log(this.regForm.value); // directe call it

  // SINGLE VALUE PRINT IT .
  // console.log(this.regForm.get('fname')?.value)
  // console.log(this.regForm.get('email')?.value)
 }

 reset(){
  // this.regForm.reset(); 
   this.regForm.reset({

     lname:this.regForm.get('lname')?.value
   })
 }

 filldata(){

    // this.regForm.setValue({
    //   // id:101,
    //   fname:'Ranjit',
    //   lname:'Kalee',
    //   email:'rk@gmail.com',
    //   mobileno:'098753222',
    // })


    this.regForm.patchValue({
      // id:101,
      fname:'Ranjit',
      lname:'Kalee',
      email:'rk@gmail.com',
      // mobileno:'098753222',
    })
 }



//  ARRAY FORM IN REACTIVEFORM

addmore(){
  this.regForm.get('mobilesno').push(
    // new FormControl()
    new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)])
   );
}

deleterow(val:any){
  this.regForm.get('mobilesno').removeAt(val);
}
}
