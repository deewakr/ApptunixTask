import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/shared/services/employee-service.service';
import { HelperService } from 'src/app/shared/services/helper-service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  empForm!: FormGroup;
  isUpdated: boolean = false;

  constructor(private empService: EmployeeService,private helperService:HelperService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInIt();
    if (this.data.id) {
      this.isUpdated = true;
      this.getSingleEmp(this.data.id)
    } else {
      this.isUpdated = false;
    }
  }

  formInIt() {
    this.empForm = this._fb.group({
      id: ['', [Validators.required]],
      employee_name: ['', [Validators.required]],
      employee_salary: ['', [Validators.required]],
      employee_age: ['', [Validators.required]],
    })
  }

  addEmp() {
    if(this.empForm.valid){
      this.empService.addEmployee(this.empForm.value).then((res) => {
        console.log(res);
        if (res) {
          this.onNoClick();
          this.helperService.openSnackBar('Emplyee succesfully added !!')
        }
      }).catch((err) => {
        console.log(err)
        this.helperService.openSnackBar('Error Found !!')

      })
      console.log(this.empForm.value);
    }
   
  }

  updateEmp():void{
    if (this.empForm.valid) {
    this.empService.updateEmployee(this.data.id, this.empForm.value).then((res: any) => {
      console.log(res)
      if (res) {
        this.onNoClick();
        this.helperService.openSnackBar('Emplyee succesfully updated !!')

      }
    }).catch((err)=>{
      console.log(err);
      this.helperService.openSnackBar('Error Found !!')

    });
  }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSingleEmp(id: number) {
    this.empService.getEmployeesById(id).then((res: any) => {
      this.empForm.patchValue({
        id: res.data.id,
        employee_name: res.data.employee_name,
        employee_salary: res.data.employee_salary,
        employee_age: res.data.employee_age,
      });
    }).catch((err)=>{
      this.helperService.openSnackBar('Error Found !!')
    })
  }
}
