import { Component, OnInit } from '@angular/core';

import { TaskInterface } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'my-app',
  templateUrl: 'all-task.component.html',
  styleUrls: ['all-task.component.css']
})

export class AllTaskComponent implements OnInit { 
  tasks: TaskInterface[];
  errorMessage: string;
  
  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this._taskService.getUsers()
      .subscribe(users => this.matchUsersToTask(users))
  }
  
  private matchUsersToTask(users): void {
    this._taskService.getTasks()
     .subscribe(tasks => {
       tasks.forEach(task => {
         users.forEach(user => {
           if (user.jobs.indexOf(task._id) !== -1) {
             task.users = !task.users ? user.name : 
               `${task.users}, ${user.name}`;
           }
         })
       })
       this.tasks = tasks;
     });
  }
  
}