import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';

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

    editForm: boolean = false

    contact: any

    constructor(private readonly contactsService: ContactsService, private router: Router) {}

    ngOnInit() : void {
        this.contactsService
            .getContacts()
            .subscribe((data) => {
                this.contacts = data.data,
                this.rotateSpinner = false
            });
    }

    openEditDialog(c: ContactModel) {
        
        this.editForm = true
        this.contact = c

    }

    receiveMessage($event: any) {
        this.editForm = $event
    }

    openAddDialog() {
    

    }

}
