import { Component } from '@angular/core';
import {Person} from './core/person.interface';
import {data} from './core/data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // All persons
  public persons: Person[] = data;
}
