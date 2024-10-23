import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { DialogService } from 'src/app/Services/dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:any = FormGroup;
  roles: string[] = ['patient', 'doctor'];
  genders:string[] =['male','female','other'];

  data: any = {
    firstName: 'Bashaar',
    lastName: 'Tariq',
    email: "Bashaar.tariq12@outlook.com",
    password: '123456',
    confirmPassword: '123456',
    gender: 'male',
    role: 'patient'
  };

  constructor(private fb: FormBuilder,private dialog:DialogService,
    private authService:AuthService,private router:Router) { }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required]],
      dob:['',[Validators.required]]
    },
      { validators: this.passwordMatchValidator });
    this.signupForm.patchValue(this.data);
  }

  passwordMatchValidator(group: FormGroup) {

    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { mismatch: true };
  
    }
  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const formValues = this.signupForm.value;
      if (formValues.dob) {
        const formattedDob = new Date(formValues.dob).toISOString().split('T')[0];
        this.signupForm.patchValue({ dob: formattedDob });
      }

      this.authService.signup(this.signupForm.value).subscribe(result=>{
        //console.log(result);
        alert(result.message);
        localStorage.setItem('token',result.token);
        this.router.navigate(['patient/add']);
      },err=>{
        //console.log(err);
        alert(err.error.message);
      });
    }
  }

  onClose()
  {
    this.dialog.closeDialog();
  }
}