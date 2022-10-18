import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TableComponent} from './components/table/table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResizableDirective} from './directives/resizable.directive';
import {TableHeaderComponent} from './components/table/table-header/table-header.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ResizableDirective,
    TableHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
