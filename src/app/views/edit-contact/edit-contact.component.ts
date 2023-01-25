import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { ContactModel, ContactWriteModel } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { NumberInput } from '@angular/cdk/coercion';


@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {

    @Input() data: any
    @Output() event = new EventEmitter<boolean>()

    rotateSpinner: boolean = false

    editForm: boolean = false

    constructor( 
        private readonly contactsService: ContactsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        //this.contactsService
            //.getContactById(this.data)
            //.subscribe((data) => {
               // this.contact = data,
              //  this.rotateSpinner = false   
           // });
    }

    editContact() {
        this.rotateSpinner = true
        this.contactsService
            .updateContact(this.data.id, this.data)
            .subscribe(() => {
                this.event.emit(this.editForm)
                this.rotateSpinner = false
            })
         
    }

    exitDialog() {
        this.event.emit(this.editForm)
       
    }
}


