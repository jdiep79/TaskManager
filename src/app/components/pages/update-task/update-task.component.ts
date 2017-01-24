import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


import { TaskInterface } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';


@Component({
  selector: 'my-app',
  templateUrl: 'update-task.component.html',
  styleUrls: ['update-task.component.css']
})

export class UpdateTaskComponent implements OnInit { 
  task: TaskInterface;
  errorMessage: string;
  updateMessage: string;
  private sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _taskService: TaskService
  ){}
  
   ngOnInit(): void {
      this.sub = this._route.params.subscribe(
        params => {
          this.getTask(params['id']);
        });
   }
  
   getTask(id: number) {
      this._taskService.getTask(id)
        .subscribe(
        task => this.task = task,
        error => this.errorMessage = <any>error
      );
    }
  
    updateTask(id: number) {
      this._taskService.updateTask(task)
        .subscribe(
         message => this.updateMessage = message.status,
         error => this.errorMessage = <any>error
        )
    }

}