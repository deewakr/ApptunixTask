import { Component } from '@angular/core';
import { HelperService } from './shared/services/helper-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apptunixTask';
  constructor(public helperService:HelperService){

  }
}
