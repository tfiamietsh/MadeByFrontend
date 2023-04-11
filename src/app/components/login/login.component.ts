import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    hide: boolean = true;
    error: string = '';

    constructor(private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get username() { return this.loginForm.controls['username'] }
    get password() { return this.loginForm.controls['password'] }

    onSubmit() {
        this.authService.login(this.username.value, this.password.value)
            .pipe(first()).subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: (error) => {
                    this.error = String(error).replace('Error: ', '');
                    if (!this.error.includes('пароль'))
                        this.username.setValue('');
                    this.password.setValue('');
                }
            });
    }
}
