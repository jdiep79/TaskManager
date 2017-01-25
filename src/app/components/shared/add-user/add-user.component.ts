import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInterface } from '../../../interfaces/user.interface';
import { TaskService } from '../../../services/task.service';

import { User } from './user';

@Component({
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.css']
})

export class AddUserComponent { 
  userForm: FormGroup;
  user: User = new User();
  errorMessage: string;
  
  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this._createForm();
  }
    
  save(): void {
    this.user.name = this.userForm.get('name').value;
    this._taskService.addUser(this.user)
      .subscribe(
        (message) => this._onSaveComplete(message),
        (error: any) => this.errorMessage = <any>error
      );
  }
  
  private _onSaveComplete(message: any): void {
    console.log(message);
    this.userForm.reset();
    this.goBackToPreviousPage();
  }
  
  goBackToPreviousPage(): void {
    this.router.navigate(['/allusers']);
  }
  
  private _createForm(): void {
   this.userForm = this._fb.group({
     name: ''
   });
  }
 
}










































