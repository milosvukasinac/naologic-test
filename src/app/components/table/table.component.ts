import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../core/person.interface';
import {FormControl} from '@angular/forms';
import {combineLatest, debounceTime, map, Observable, of, startWith} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() persons: Person[] = [];

  public allSelected: boolean = false;
  public searchControl = new FormControl('', {nonNullable: true});
  public searchedPersons$: Observable<Person[]> = of(this.persons);

  // Returns selected count
  public get selectedCount(): number {
    return this.persons.filter((item) => item.selected === true).length;
  }

  ngOnInit(): void {
    // Search term value
    const searchTerm$ = this.searchControl.valueChanges.pipe(
      debounceTime(400),
      startWith(''),
    );

    // All persons data
    const allPersons$ = of(this.persons);

    // Combine two observables and return matching result
    this.searchedPersons$ = combineLatest(allPersons$, searchTerm$)
      .pipe(
        map(([persons, searchTerm]) => persons.filter((person) => this.filterValue(person, searchTerm.toLowerCase())))
      );
  }

  // Filter persons by the name
  private filterValue(person: Person, searchTerm: string): boolean {
    if (person.name.toLowerCase().includes(searchTerm)) {
      person.expandChildren = searchTerm !== '';
      return true;
    }

    if (person.children?.length) {
      const childrenMatch = this.childrenMatch(person, searchTerm);
      person.expandChildren = searchTerm === '' ? false : childrenMatch;
      return childrenMatch;
    }

    return false;
  }

  // Filter children nodes
  private childrenMatch(person: Person, searchTerm: string): boolean {
    let match: boolean | null = null;

    for (let children of person.children!) {
      if (match === null) {
        match = this.filterValue(children, searchTerm);
      } else {
        let filterValue = this.filterValue(children, searchTerm);
        match = (filterValue || match);
      }
    }

    return match!;
  }

  // Select all persons
  public selectAll(): void {
    this.allSelected = !this.allSelected;
    this.persons.forEach((item) => item.selected = this.allSelected);
  }
}
