import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee-service.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  empData:any;
  getEmpId!:any;
  constructor(private route: ActivatedRoute,
    private router: Router, private empService: EmployeeService) {

   }

  ngOnInit(): void {
    this.getEmpId = this.route.snapshot.queryParamMap.get('data')
    if(this.getEmpId == null ){
      this.router.navigate(['/']);
    }else{
      this.getSingleEmp(this.getEmpId);
    }

  }

  getSingleEmp(id?: any) {
    this.empService.getEmployeesById(id).then((res: any) => {
     this.empData = res.data;
    }).catch((err)=>{
      console.log(err);
    });
  }

  back(){
    this.router.navigate(['/'])
  }

}
