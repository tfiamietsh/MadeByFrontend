import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../helpers/item';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class ItemService {
    constructor(private http: HttpClient) { }

    getItemList() { return this.http.get<Item[]>(`${environment.apiUrl}/items`); }
}
