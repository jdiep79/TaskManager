import { Component, OnInit } from '@angular/core';

import { TaskInterface } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  templateUrl: 'all-task.component.html',
  styleUrls: ['all-task.component.css']
})

export class AllTaskComponent implements OnInit { 
  tasks: TaskInterface[];
  errorMessage: string;
  
  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this._taskService.getUsers()
      .subscribe(
        users => this._matchUsersToTask(users),
        error => this.errorMessage = <any>error
      );
  }
  
  private _matchUsersToTask(users): void {
    this._taskService.getTasks()
     .subscribe(tasks => {
       tasks.forEach(task => {
         users.forEach(user => {
           if (user.jobs.indexOf(task._id) !== -1) {
             task.users = !task.users ? user.name : 
               `${task.users}, ${user.name}`;
           }
         })
       },
       error => this.errorMessage = <any>error
       )
       this.tasks = tasks;
     });
  }
  
}