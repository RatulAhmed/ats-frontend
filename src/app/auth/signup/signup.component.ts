import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, public router : Router) { }

  ngOnInit(): void {
  }

  onSignupForm(form:NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.username, form.value.password);
    this.router.navigate(['/login']);
  }
}
