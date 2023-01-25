import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

    dataSource: MatTableDataSource<ContactModel>;

    contactData: any
    rotateSpinner: boolean = true
    editForm: boolean = false

   

    constructor(private readonly contactsService: ContactsService) {}
    

    ngOnInit() : void {
        this.contactsService
            .getContacts()
            .subscribe((data) => {
                this.dataSource = new MatTableDataSource(data.data);
                this.dataSource.paginator = this.paginator;
                this.rotateSpinner = false
            });
            
            
        
    }


    openEditDialog(c: ContactModel) {
        this.contactData = c
        this.editForm = true
    }

    receiveMessage($event: any) {
        console.log($event.contactsEvent)
        if ($event.contactsEvent != undefined) {
            this.dataSource = new MatTableDataSource($event.contactsEvent);
        }
        this.editForm = $event.formEvent
        
        
    }

    openAddDialog() {
        

    }

}
