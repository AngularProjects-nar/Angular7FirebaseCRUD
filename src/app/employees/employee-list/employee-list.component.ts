import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  empList : Employee[];

  constructor(private empService : EmployeeService,
    private firestor: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.empService.getEmployees().subscribe(actionArray => {
      this.empList = actionArray.map( item => {
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
    });

  }

  onEdit(emp : Employee){
    this.empService.formData = Object.assign({}, emp);
  }

  onDelete(id:string){
    if(confirm("Are you sure you want to delete")){
      this.firestor.doc('employees/'+id).delete();
      this.toastr.warning('Deleted Successfully', 'Employee.Register');
    }

  }

}
