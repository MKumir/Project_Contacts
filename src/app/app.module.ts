import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ContactsTableComponent } from './views/contacts-table/contacts-table.component';
import { EditContactComponent } from './views/edit-contact/edit-contact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [AppComponent, ContactsTableComponent, EditContactComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatDialogModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatPaginatorModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
