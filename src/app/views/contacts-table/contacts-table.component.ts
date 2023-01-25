import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactsService, GetContactsQuery } from 'src/app/services/contacts.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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

    @ViewChild('paginator') paginator: MatPaginator

    contacts: ContactModel[] = [];
    query: GetContactsQuery = {
        perPage: 1000000
    }

    dataSource: MatTableDataSource<ContactModel>;
    
    rotateSpinner: boolean = true

    pageSize: number[] = [20, 10, 5]
   
    constructor(private readonly contactsService: ContactsService, private router: Router) {}
    

    ngOnInit() : void {
        this.contactsService
            .getContacts(this.query)
            .subscribe((data) => {
                this.contacts = data.data
                this.dataSource = new MatTableDataSource(this.contacts);
                this.dataSource.paginator = this.paginator;
                this.rotateSpinner = false
                
            });
            
    }


    editContact(c: ContactModel) {
        this.router.navigateByUrl('contact', {state: {
            data: c.id,
        }})
        
    }

    addContact() {
        this.router.navigateByUrl('contact')

    }

    removeContact(c: ContactModel) {
        if(confirm(`Are you sure you want to delete contact ${c.firstName} ${c.lastName}?`)) {
            this.rotateSpinner = true
            this.contactsService
            .deleteContact(c.id)
            .subscribe(() => {
                window.location.reload()
                this.rotateSpinner = false
            })
        }
       
    }

}
