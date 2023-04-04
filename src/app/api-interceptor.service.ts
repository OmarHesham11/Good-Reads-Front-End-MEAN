// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// import { Authadminservice } from "./auth-admin.service";

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private _authAdmin:Authadminservice) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     request = request.clone({
//       setHeaders: {
//         Authorization: `${this._authAdmin.adminToken()}`
//       }
//     });

//     return next.handle(request);
//   }
// }