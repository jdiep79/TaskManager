import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { TaskInterface } from '../interfaces/task.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()

export class TaskService {
  private _taskUrl = 'http://interview.lenderprice.com:7070/api/jobs';
  private _userUrl = 'http://interview.lenderprice.com:7070/api/assignee';
  
  constructor(private _http: Http) {}

  getTasks(): Observable<TaskInterface[]> {
    return this._http.get(this._taskUrl)
      .map((response: Response) => <TaskInterface[]> response.json())
      .catch(this._handleError);
  }
    
  getTask(id: number): Observable<TaskInterface> {
    const url = `${this._taskUrl}/${id}`;

    return this._http.get(url)
      .map((response: Response) => <TaskInterface> response.json())
      .catch(this._handleError);
  }
    
  addTask(task: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this._taskUrl, task, options)
      .map((response: Response) => <any> response.json())
      .catch(this._handleError);
  }
    
  updateTask(task: TaskInterface): Observable<TaskInterface> {
    const url = `${this._taskUrl}/${task._id}`;
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(url, task, options)
      .map((response: Response) => <any> response.json())
      .catch(this._handleError);
  }
  
  getUsers(): Observable<UserInterface[]> {
    return this._http.get(this._userUrl)
      .map((response: Response) => <UserInterface[]> response.json())
      .catch(this._handleError);
  }
    
  private _handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
