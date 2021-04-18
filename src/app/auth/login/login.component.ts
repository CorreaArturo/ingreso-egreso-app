import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;
  cargando:boolean = false;
  uiSubscription: Subscription;

  constructor(private fb:FormBuilder, 
              private auth:AuthService,
              private router:Router,
              private store: Store<AppState>) { }
  
  
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading;
      console.log(`cargando subs ${this.cargando}`);
    });
  }

  loginUsuario():void{
    if(this.loginForm.invalid){return;}
    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    
    const {email, password} = this.loginForm.value;

    this.auth.loginUsuario(email,password).then((response)=>{
      console.log(`${response}`);
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['']);
    }).catch(error=>
      {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      }
      )});
  }

}
