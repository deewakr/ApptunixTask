import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private baseService: BaseService) { }

  addEmployee(data: any) {
    const url = `/employee/create`;
    return this.baseService.post(url, data);
  }

  getAllEmployees() {
    const url = `/employee/getAll`;
    return this.baseService.get(url);
  }

  getEmployeesById(empId: any){
    const url = `/employee/get/${empId}`;
    return this.baseService.get(url);
  }

  deleteEmployee(empId: any) {
    const url = `/employee/delete/${empId}`;
    return this.baseService.delete(url);
  }

  updateEmployee(empId: any, data: any) {
    const url = `/employee/update/${empId}`;
    return this.baseService.put(url, data);
  }
}
