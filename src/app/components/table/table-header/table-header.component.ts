import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'th[resizable]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @HostBinding('style.width.px') width: number | null = null;

  onResize(width: any) {
    this.width = width;
  }

}
