import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { MatDialog } from '@angular/material/dialog'
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
    selector: 'app-contacts-table',
    templateUrl: './contacts-table.component.html',
    styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent implements OnInit {
    visibleColumns: string[] = [
        'id',
        'firstName',
        'lastName',
        'email',
        'address',
        'phoneNumber',
        'actions',
    ];
    contacts: ContactModel[] = [];

    rotateSpinner: boolean = true

    constructor(private readonly contactsService: ContactsService, private dialog: MatDialog) {}

    ngOnInit() : void {
        this.contactsService
            .getContacts()
            .subscribe((data) => {
                this.contacts = data.data,
                this.rotateSpinner = false
            });
    }

    openEditDialog(contact: ContactModel) {
        this.dialog.open(EditContactComponent, {
            data: {
                id: contact.id
            },
            
        });

    



    }

    openAddDialog() {
        this.dialog.open(EditContactComponent);
        


    }

}
