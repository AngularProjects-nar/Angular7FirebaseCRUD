import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private empService : EmployeeService, 
    private firestore : AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null){
      form.resetForm();
    }

    this.empService.formData = {
      id: null,
      fullname: "",
      empcode: "",
      position: "",
      mailid: ""
    }
    
  }

  onsubmit(form: NgForm){
    let data = form.value;
    this.firestore.collection('employees').add(data);
    this.resetForm(form);
  }

}
