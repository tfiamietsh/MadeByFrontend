import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
    constructor(private http: HttpClient,
        private authService: AuthenticationService) { }
        
    getRecommendationList() {
        return this.http.get<any>(`${environment.apiUrl}/recommendations`,
            { params: new HttpParams().set('user_id', this.authService.userValue!.id) });
    }
}
