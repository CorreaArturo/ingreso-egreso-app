import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando:boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService:AuthService,
    private router:Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading;
    });

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy():void{
    this.uiSubscription.unsubscribe();
  }  

  crearUsuario():void{
    const { nombre, correo, password } = this.registroForm.value;

     this.store.dispatch(ui.isLoading()); 

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });    

    this.authService.crearUsuario(nombre, correo, password).then((credenciales)=>{
      this.store.dispatch(ui.stopLoading());
      console.log(`credenciales ${credenciales}`);
      // Swal.close();
      this.router.navigate(['/']);
    }).catch((error)=> {
      this.store.dispatch(ui.stopLoading());
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
