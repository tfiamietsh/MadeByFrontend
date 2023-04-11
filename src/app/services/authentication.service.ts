import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../helpers/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    private refreshTokenTimeout: any;

    constructor(private http: HttpClient, private cookie: CookieService,
        private router: Router) {
        this.userSubject = new BehaviorSubject<User | null>(
            cookie.check('user') ? JSON.parse(cookie.get('user')) : null
        );
    }

    public get userValue(): User | null { return this.userSubject.value; }

    private refreshUser(user: User | null) {
        this.userSubject.next(user);
        if (user === null) {
            this.cookie.delete('user');
            this.stopRefreshTokenTimer();
        } else {
            this.cookie.set('user', JSON.stringify(user));
            this.startRefreshTokenTimer();
        }
    }

    public login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`,
            { 'username': username, 'password': password },
            { withCredentials: true })
            .pipe(map((user) => {
                if (user['message']) {
                    this.userSubject.next(null);
                    throw new Error(user['message']);
                } else {
                    this.refreshUser(user);
                    return user;
                }
            }));
    }

    public logout() {
        this.http.post<any>(`${environment.apiUrl}/logout/access`, {},
            { withCredentials: true }).subscribe();
        this.http.post<any>(`${environment.apiUrl}/logout/refresh`, {},
            { withCredentials: true }).subscribe();
        this.refreshUser(null);
        this.router.navigate(['/']  );
    }

    public refreshToken() {
        return this.http.post<any>(`${environment.apiUrl}/token/refresh`,
            { 'username': this.userValue?.username || '' },
            { withCredentials: true })
            .pipe(map((response) => {
                let user: any = this.userValue;

                user['access_token'] = response['access_token'];
                this.refreshUser(user);
                return user;
            }));
    }

    private startRefreshTokenTimer() {
        const expires = new Date(Date.now());

        expires.setMinutes(expires.getMinutes() + 5);
        this.refreshTokenTimeout = setTimeout(
            () => this.refreshToken().subscribe(), expires.getTime() - Date.now()
        );
    }

    private stopRefreshTokenTimer() { clearTimeout(this.refreshTokenTimeout); }
}
