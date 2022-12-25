import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  @Input() id!: string;
  customer!: Customer;
  constructor(
    private customerService: CustomersService,
    private modal: NgbModal,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomerById(this.id).subscribe({
      next: (customerData: Customer) => {
        (this.customer = customerData), console.log(this.customer);
      },
    });
  }

  deleteCustomer(customer: Customer): void {
    if (confirm('Are you sure')) {
      this.customerService
        .deleteCustomer(customer)
        .then(() => {
          console.log('Customer was Deleted'), this.activeModal.close();
        })
        .catch((err) => console.log(err));
    }
  }

  updateCustomer(customer: Customer) {
    this.activeModal.close();
    let modalRef = this.modal.open(EditCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = customer.id;
  }
}