import { Component, Input } from '@angular/core';
import { Item } from 'src/app/helpers/item';

@Component({
    selector: 'app-gridview',
    templateUrl: './gridview.component.html',
    styleUrls: ['./gridview.component.css']
})
export class GridviewComponent {
    @Input() header: string | null = null;
    @Input() numCols: number = 3;
    @Input() animation: boolean = false;
    @Input() items: Item[] = [];

    get style() { return 'width: ' + 100. / this.numCols + '%; float: left'; }

    src(item: Item) { return 'assets/photos/photo-' + item.id.toString() + '.png'; }

    get class() { return this.animation ? 'anim' : ''; }
}
