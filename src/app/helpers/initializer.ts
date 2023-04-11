import { AuthenticationService } from "../services/authentication.service";

export function appInitializer(authService: AuthenticationService) {
    return () => new Promise<void>((resolve) => {
        if (authService.userValue !== null)
            authService.refreshToken().subscribe().add(resolve);
        else
            resolve();
    })
}
