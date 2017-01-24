import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AllTaskComponent } from './components/pages/all-task/all-task.component';
import { UserTaskComponent } from './components/pages/user-task/user-task.component';
import { AddTaskComponent } from './components/shared/add-task/add-task.component';
import { UpdateTaskComponent } from './components/shared/update-task/update-task.component';
import { AllUsersComponent } from './components/pages/all-users/all-users.component';

import { TaskStatusFilterPipe } from './pipes/task-status-filter.pipe';
import { NewLineFilterPipe } from './pipes/newline-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'mytask', component: UserTaskComponent },
      { path: 'task', component: AllTaskComponent },
      { path: 'addtask', component: AddTaskComponent },
      { path: 'task/:id', component: UpdateTaskComponent },
      { path: 'allusers', component: AllUsersComponent },
      { path: '', redirectTo: 'mytask', pathMatch: 'full'},
      { path: '**', redirectTo: 'mytask', pathMatch: 'full' }
    ])
  ],
  declarations: [
    AppComponent,
    UserTaskComponent,
    AllTaskComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    AllUsersComponent,
    TaskStatusFilterPipe,
    NewLineFilterPipe,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
