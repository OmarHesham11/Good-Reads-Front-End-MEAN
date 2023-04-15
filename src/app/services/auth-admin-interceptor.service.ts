import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminInterceptorService {

  constructor(private injector: Injector) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = this.injector.get(AuthService)

    return next.handle(httpRequest.clone({ setHeaders: { Authorization: `${auth.token()}` } }));
  }
}
