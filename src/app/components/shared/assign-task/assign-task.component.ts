import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import { UserInterface } from '../../../interfaces/user.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  templateUrl: 'assign-task.component.html',
  styleUrls: ['assign-task.component.css']
})

export class AssignTaskComponent implements OnInit, OnDestroy { 
  taskForm: FormGroup;
  user: UserInterface;
  userID: string;
  
  errorMessage: string;
  assignMessage: string;
  
  private _sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _location: Location,
    private _taskService: TaskService,
    private _fb: FormBuilder,
  ){}
  
  ngOnInit(): void {
    this._createForm();

    this._sub = this._route
      .params
      .subscribe( 
        params => this.userID = params['id'],
        error => this.errorMessage = <any>error
      )
  }
  
  ngOnDestroy() {
    this._sub.unsubscribe();
  }
  
  goBackToPreviousPage(): void {
    this._location.back();
  }
  
  assignJob(): void {
    const taskID = this.taskForm.get('taskID').value;

    this._taskService.assignTask(this.userID, taskID)
      .subscribe( message => {
         console.log('message', message);
         this._onAssignComplete();
       },
       error => this.errorMessage = <any>error
  }
                 
  private _createForm(): void {
    this.taskForm = this._fb.group({
      taskID: ''
    });
  }
    
  private _onAssignComplete(): void {
    this.taskForm.reset();
    this.goBackToPreviousPage();
  }
  

}