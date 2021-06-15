import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoPageDynamicEditModule, PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { PetTableComponent } from './pet-table/pet-table.component';
import { PetEditComponent } from './pet-edit/pet-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PetTableComponent,
    PetEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
