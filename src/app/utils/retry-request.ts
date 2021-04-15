import { getParseErrors } from '@angular/compiler';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, retryWhen, tap} from 'rxjs/operators';

const getErrorMessage = (maxRetry:number) => 
    `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up.`;

const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_BACKOFF = 1000;


export function delayedRetry(delayMs:number, maxRetry=DEFAULT_MAX_RETRIES){
    let retries = maxRetry;
    console.log(`ejecuta 1.`);
    return ((src:Observable<any>)=>src.pipe(
        tap(()=>{console.log(`ejecuta 2.`);}),
        retryWhen((errors:Observable<any>)=>errors.pipe(
            tap(()=>{console.log(`ejecuta 3.`)}),
            delay(delayMs),
            mergeMap(error => retries-- > 0 ? of(error):throwError(getErrorMessage(maxRetry)))
        ))
    ));
}

export function retryWithBackoff(delayMs:number, maxRetry=DEFAULT_MAX_RETRIES, backoffMs=DEFAULT_BACKOFF){
    let retries = maxRetry;
    return ((src:Observable<any>)=>src.pipe(
        retryWhen((erros:Observable<any>)=>erros.pipe(
            mergeMap(error=>{
                console.log(`Intentando calavera..`);
                if(retries-- > 0){
                    const backoffTime = delayMs + (maxRetry -retries) * backoffMs;
                    return of(error).pipe(delay(backoffTime));
                }
                return throwError(getErrorMessage(maxRetry));
            })
        ))
    ));
}