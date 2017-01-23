import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
            .catch(this.handleError);
    }
    
    getUsers(): Observable<UserInterface[]> {
        return this._http.get(this._userUrl)
            .map((response: Response) => <UserInterface[]> response.json())
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
