import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  constructor(
    private customerService: CustomersService,
    private modal: NgbModal
  ) {}
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (customersData: Customer[]) => (this.customers = customersData),
    });
  }

  addCustomer() {
    this.modal.open(AddCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
  }
  deleteCustomer(customer: Customer): void {
    if (confirm('Are you sure')) {
      this.customerService
        .deleteCustomer(customer)
        .then(() => console.log('Customer was Deleted'))
        .catch((err) => console.log(err));
    }
  }

  updateCustomer(customer: Customer) {
    let modalRef = this.modal.open(EditCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = customer.id;
  }

  veiwCustomer(customer: Customer) {
    let modalRef = this.modal.open(CustomerDetailsComponent, {
      size: 'md',
      centered: true,
      windowClass: 'darl-modal',
    });
    modalRef.componentInstance.id = customer.id;
  }

  clearSearch() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
  }
}