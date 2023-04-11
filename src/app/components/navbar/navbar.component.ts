import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private authService: AuthenticationService) {}

    get user() { return this.authService.userValue !== null; }

    onLogout() { this.authService.logout(); }
}
