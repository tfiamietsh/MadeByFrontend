import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css']
})
export class PanelComponent {
    @Input() url!: string;
    @Input() height: string = 'fit-content';
    @Input() shade: number = 0.;
    @Input() header: string = '';
    @Input() text: string = '';

    get tableStyle() {
        return 'width: 100%; height: ' + this.height + '; background-image: url(\'' + this.url + '\')';
    }

    get trStyle() { return 'background-color: rgba(0, 0, 0, ' + this.shade.toString() + ')'; }

    get separator() {
        let sep = '';

        for (let i = 0; i < this.header.length / 2; i++)
            sep += '–';
        return sep;
    }
}
