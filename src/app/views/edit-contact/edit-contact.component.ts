import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from 'src/app/services/contacts.service';
import { ContactModel, ContactWriteModel } from 'src/app/models/contact.model';
import { Router } from '@angular/router';


@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {

    id: number
    contact: any
    rotateSpinner: boolean = true

    constructor(
        
        private readonly contactsService: ContactsService,
        private router: Router,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.id = data.id
        }

    ngOnInit(): void {
        this.contactsService
            .getContactById(this.id)
            .subscribe((data) => {
                this.contact = data,
                this.rotateSpinner = false   
            });
    }

    editContact() {
        this.contactsService
            .updateContact(this.contact.id, this.contact)
            .subscribe()
        this.dialogRef.close(
           
        )
        
    
        
         
    }

    exitDialog() {
        this.dialogRef.close()
    }
}


