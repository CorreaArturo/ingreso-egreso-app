import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  crearUsuario():void{
    const { nombre, correo, password } = this.registroForm.value;

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }
    });    

    this.authService.crearUsuario(nombre, correo, password).then((credenciales)=>{
      console.log(`credenciales ${credenciales}`);
      Swal.close();
      this.router.navigate(['/']);
    }).catch((error)=> {
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message
    }
    )});
    /*
    console.log(this.registroForm);
    console.log(this.registroForm.valid);
    console.log(this.registroForm.value);
    */
  }

}
