import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: any = FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) { }
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    console.log(this.loginForm.value);

    this.auth.signin(this.loginForm.value).subscribe((response) => {
      const token = response.token;
      const user = response.user;
      this.auth.user = user;
      localStorage.setItem('token', token);
      console.log(this.auth.user);
      alert(response.message);
    }, (err) => { })

  }
}