import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const user = this.authService.userValue;
        let token = null;

        if (user !== null) {
            if (request.url.includes('refresh'))
                token = user.refresh_token;
            else
                token = user.access_token;
            
        }
        return next.handle(token !== null ? request.clone({
            setHeaders: { Authorization: 'Bearer ' + token }
        }) : request);
    }
}
