import { Component, OnInit } from '@angular/core';

import { TaskInterface } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private _taskService: TaskService
  ) { }
  
  ngOnInit(): void {
     this.taskForm = this._fb.group({
        summary: '',
        description: '',
     });
  }
  
  save() {
    this.task.summary = this.taskForm.get('summary').value;
    this.task.description = this.taskForm.get('description').value;
    this._taskService.addTask(this.task)
      .subscribe(
        () => this.onSaveComplete(),
        (error: any) => {
          this.errorMessage = <any>error
          console.log('error!!', this.errorMessage)
        }
      );
  }
  
  onSaveComplete(message: any): void {
    this.taskForm.reset();
  }
 
}












































