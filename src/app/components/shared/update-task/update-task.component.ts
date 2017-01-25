import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import { TaskInterface } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'my-app',
  templateUrl: 'update-task.component.html',
  styleUrls: ['update-task.component.css']
})

export class UpdateTaskComponent implements OnInit, OnDestroy { 
  taskForm: FormGroup;
  task: TaskInterface;
  
  errorMessage: string;
  updateMessage: string;
  
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
        params => this._getTask(params['id']),
        error => this.errorMessage = <any>error
      )
  }
  
  ngOnDestroy() {
    this._sub.unsubscribe();
  }
  
  private _createForm(): void {
    this.taskForm = this._fb.group({
      summary: '',
      description: '',
      status: '',
      start_date: '',
      end_date: ''
    });
  }
  
  private _getTask(id: number): void {
    this._taskService.getTask(id)
      .subscribe( task => {
        this.task = task;
        this._addValuesToForm();
      },
      error => this.errorMessage = <any>error
    );
  }
  
  private _addValuesToForm(): void {
    this.taskForm.patchValue({
      summary: this.task.summary,
      description: this.task.description,
      status: this.task.status,
      start_date: this.task.start_date,
      end_date: this.task.end_date
    });
  }
  
  private _onUpdateComplete(): void {
    this.taskForm.reset();
    this.goBackToPreviousPage();
    
  }
  
  goBackToPreviousPage(): void {
    this._location.back();
  }

  updateTask(): void {
    const changedTask = Object.assign({}, this.task, this.taskForm.value);
    
    this._taskService.updateTask(changedTask)
      .subscribe( message => {
         this.updateMessage = message.status;
         console.log('message', this.updateMessage)
         this._onUpdateComplete();
       },
       error => this.errorMessage = <any>error
      )
  }

}