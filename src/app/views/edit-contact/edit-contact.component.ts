import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ContactWriteModel } from 'src/app/models/contact.model';
import { ContactsService, GetContactsQuery } from 'src/app/services/contacts.service';

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {

    id: number

    contact: ContactWriteModel

    rotateSpinner: boolean = false

    query: GetContactsQuery = {
        perPage: 100
    }

    message: string = ""

    constructor( private readonly contactsService: ContactsService, private router: Router) {
        //this.router.getCurrentNavigation()?.extras.state
    }

    ngOnInit(): void {
        this.id = history.state.data
        if(this.id != undefined) {
            this.rotateSpinner = true
            this.contactsService
            .getContactById(this.id)
            .subscribe((data) => {
                this.contact = data
                this.rotateSpinner = false
            });
        } else {
            this.contact = {
                firstName: "",
                lastName: "",
                emailAddress: "",
                address: "",
                phoneNumber: ""
            }
        }
     
    }

    saveContact() {
        this.checkValidation(this.contact)
        if (this.message != "") {
            window.alert(this.message)
            this.message = ""
            return
        }
        if(this.id != undefined) {
            this.rotateSpinner = true
            this.contactsService
                .updateContact(this.id, this.contact)
                .subscribe(() => {
                    this.router.navigateByUrl('')
                    this.rotateSpinner = false
                })
        } else {
            this.rotateSpinner = true
            this.contactsService
                .createContact(this.contact)
                .subscribe((data) => {
                    console.log(data)
                    this.router.navigateByUrl('')
                    this.rotateSpinner = false
                })
        }
        
    }

    exitContact() {
        this.router.navigateByUrl('')
    }

    checkValidation(c: ContactWriteModel) {
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let phoneNumberRegex = /^[0-9+ ]/
        if(c.firstName == "" || undefined || null) {
            this.message += "Please write contact first name.\n"
        }
        if(c.lastName == "" || undefined || null) {
            this.message += "Please write contact last name.\n"
        }
        if(!c.emailAddress?.match(emailRegex)) {
            this.message += "Please write valid email.\n"
        }
        if(!c.phoneNumber?.match(phoneNumberRegex)) {
            this.message += "Please write valid phone number.\n"
        }
    }

}


