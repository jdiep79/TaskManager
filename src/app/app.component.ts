import { Component } from '@angular/core';
import { TaskService } from './services/task.service';

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TaskService ]
})

export class AppComponent { }