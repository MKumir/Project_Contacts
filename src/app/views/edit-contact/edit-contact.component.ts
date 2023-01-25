import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {

    @Input() data: any
    @Output() event = new EventEmitter<any>()


    rotateSpinner: boolean = false

    constructor( private readonly contactsService: ContactsService) {}

    currentData: any
    ngOnInit(): void {
        /*this.contactsService
            .getContacts()
            .subscribe((data) => {
                this.currentData = data.data
                this.rotateSpinner = false
        });*/
    }

    editContact() {
        this.rotateSpinner = true
        this.contactsService
            .updateContact(this.data.id, this.data)
            .subscribe(() => {
                this.event.emit({
                    formEvent: false
                })
                this.rotateSpinner = false
            })
         
    }

    exitContact() {
        this.rotateSpinner = true
        this.contactsService
            .getContacts()
            .subscribe((data) => {
                this.event.emit({
                    formEvent: false,
                    contactsEvent: data.data
                })
                this.rotateSpinner = false
            });


                
          
    }
}


