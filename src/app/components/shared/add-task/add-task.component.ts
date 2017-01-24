import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskInterface } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';

import { Task } from './task';

@Component({
  templateUrl: 'add-task.component.html',
  styleUrls: ['add-task.component.css']
})

export class AddTaskComponent implements OnInit { 
  taskForm: FormGroup;
  task: Task = new Task();
  errorMessage: string;
  
  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskService,
    private _router: Router
  ) { }
  
  ngOnInit(): void {
    this._createForm();
  }
    
  save(): void {
    this.task.summary = this.taskForm.get('summary').value;
    this.task.description = this.taskForm.get('description').value;
    this._taskService.addTask(this.task)
      .subscribe(
        (message) => this._onSaveComplete(message),
        (error: any) => this.errorMessage = <any>error
      );
  }
  
  private _onSaveComplete(message: any): void {
    console.log(message);
    this.taskForm.reset();
    this._router.navigate(['/task']);
  }
  
  private _createForm(): void {
   this.taskForm = this._fb.group({
     summary: '',
     description: '',
   });
  }
 
}












































