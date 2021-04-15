import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, retryWhen, tap, take, catchError } from "rxjs/operators";
import { interval, Observable, observable, of, throwError, timer } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delayedRetry, retryWithBackoff } from '../utils/retry-request';


@Injectable({
  providedIn: 'root'
})
export class UserInfoManagementService {


  constructor(private http: HttpClient) { }

  doRequestRetry() {
    let url = environment.superAppUrlApi;

    interval(1000).pipe(map(val => { 
      if (val > 2) throw new Error(`Prueba falla!!`);
      return val;
    }), 
    retryWhen(error => error.pipe(
      tap(() =>  
        console.log(`Intentando!!`))))).
        subscribe(
          val => console.log(val),
          err => console.log(err),
          () => console.log('Complete')
        )
  }

  doRequestServiceRetry():Observable<any>{
    let url = 'http://localhost:80/profile-service/profile/api/V1.0.0/personal';
    const userEmailBody = {
      email: 'local@bolivar.com'
    };

    return this.http.post<any>(`${url}`, userEmailBody).pipe(
      map(res => 
        {
          if(res.body?.email === 'local@bolivar.com')
          {
             throw new Error(`Prueba falla!!`);
          }
          return res;
        }),
        delayedRetry(3000)
    )
    ;    
  }
}
