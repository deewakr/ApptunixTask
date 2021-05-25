import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/shared/services/employee-service.service';

import { MatDialog } from '@angular/material/dialog';

import { EmployeeData } from '../../shared/modals/employee.modal';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper-service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];
  constructor(private empService: EmployeeService, private helperService: HelperService,
    public dialog: MatDialog, private _router: Router) {}

  ngOnInit(): void {
    this.getAllEmployees()
  }
  listData!: MatTableDataSource<EmployeeData>;
  displayedColumns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age', 'createdAt', 'updatedAt', 'actions'];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {}

  getAllEmployees() {
    this.empService.getAllEmployees()
      .then(async (res: any) => {
        this.employees = await res.allEmployees;
        this.listData = new MatTableDataSource(this.employees);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        console.log(res);
      }).catch((err: any) => {
        console.log(err)
        this.helperService.openSnackBar('error found!!')
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

  OpenAddEmpModal(empId?:any): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      height: '400px',
      width: '300px',
      data:{id:empId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();
      console.log('closed');
    });
  }

  editEmp(row:any):void{
  this.OpenAddEmpModal(row.id)
  }

  deleteEmp(row:any):void{
    this.empService.deleteEmployee(row.id).then((res:any)=>{
      console.log(res);
      if(res){
        this.getAllEmployees();
        this.helperService.openSnackBar('Employee succesfully deleted !!')

      }
    }).catch((err)=>{
      console.log(err)
      this.helperService.openSnackBar('Error Found !!')

    })
  }

  viewEmp(row:any, item:any):void{
   if(item.target['localName'] !== "mat-icon"){
   this._router.navigate(['view-employee'], {queryParams:{data:row.id}})
  }
  }

}

