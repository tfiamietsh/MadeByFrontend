import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Purchase } from 'src/app/helpers/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
    columns: string[] = ['icon', 'title', 'amount', 'date', 'time'];
    dataSource: MatTableDataSource<Purchase> = new MatTableDataSource;

    constructor(private purchaseService: PurchaseService) { }

    ngOnInit() {
        this.purchaseService.getPurchaseList().subscribe(purchases => {
            console.log(purchases)
            this.dataSource = new MatTableDataSource(purchases);
        });
    }

    src(purchase: Purchase) { return 'assets/photos-small/photo-' + purchase.id.toString() + '.png'; }
}
