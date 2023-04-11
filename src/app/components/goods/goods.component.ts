import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/helpers/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
    items: Item[] = [];

    constructor(private itemService: ItemService) { }

    ngOnInit() {
        this.itemService.getItemList().subscribe(items => {
            for (let item of items)
                this.items.push(item);
        });
    }
}
