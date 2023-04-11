import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router,
        private authService: AuthenticationService) { }

    canActivate(state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        if (user !== null)
            return true;
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

export const canActivate: CanActivateFn =
    (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AuthGuard).canActivate(state);
    };
