import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder, 
              private auth:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  loginUsuario():void{
    if(this.loginForm.invalid){return;}

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    
    const {email, password} = this.loginForm.value;

    this.auth.loginUsuario(email,password).then((response)=>{
      console.log(`${response}`);
      Swal.close();
      this.router.navigate(['']);
    }).catch(error=>
      {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      }
      )});
  }

}
