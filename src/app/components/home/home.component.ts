import { Component } from '@angular/core';
import { Item } from 'src/app/helpers/item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RecommendationService } from 'src/app/services/recommendation.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    items: Item[] = [];

    constructor(private recService: RecommendationService,
        private authService: AuthenticationService) {}
    
    get user() { return this.authService.userValue !== null; }

    ngOnInit() {
        this.recService.getRecommendationList().subscribe(recommended_items => {
            console.log(recommended_items)
            for (let item of recommended_items)
                this.items.push(item);
        });
    }
}
