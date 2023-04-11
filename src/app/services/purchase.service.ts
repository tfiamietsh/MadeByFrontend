import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../helpers/purchase';
import { environment } from '../environment/environment';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
    constructor(private http: HttpClient,
        private authService: AuthenticationService) { }
        
    getPurchaseList() {
        return this.http.get<Purchase[]>(`${environment.apiUrl}/purchases`,
            { params: new HttpParams().set('user_id', this.authService.userValue!.id) })
            .pipe(map(purchases => {
                for (let i in purchases) {
                    let nums = purchases[i].time.split(':');

                    purchases[i].time = [nums[0], nums[1], nums[2].split('.')[0]].join(':');
                }
                return purchases;
            }));
    }
}
