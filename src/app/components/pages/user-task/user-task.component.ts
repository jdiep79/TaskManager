import { Component, OnInit } from '@angular/core';
import { TaskInterface } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  templateUrl: 'user-task.component.html',
  styleUrls: ['user-task.component.css']
})

export class UserTaskComponent implements OnInit { 
  tasks: TaskInterface[];
  user: string = 'joshua';
  errorMessage: string;
  
  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this._taskService.getUsers()
      .subscribe(
        users => this._matchUsersToTask(users),
        error => this.errorMessage = <any>error
      )
  }

  private _filterUserTickets(tasks: TaskInterface[]): TaskInterface[] {
    return tasks.filter(task => {
      if (!task.users) { return false }
      return task.users
        .toLowerCase()
        .includes(this.user.toLowerCase());
    });
  }
  
  private _matchUsersToTask(users): TaskInterface[] {
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
       this.tasks = this._filterUserTickets(tasks);
     });
  }
  
}