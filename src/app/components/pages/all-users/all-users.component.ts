import { Component, OnInit } from '@angular/core';

import { UserInterface } from '../../../interfaces/user.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  templateUrl: 'all-users.component.html',
  styleUrls: ['all-users.component.css']
})

export class AllUsersComponent implements OnInit {
  users: UserInterface[];
  errorMessage: string;
  
  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this._taskService.getUsers()
      .subscribe(users => this.users = users)
  }
}