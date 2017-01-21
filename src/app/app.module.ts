import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AllTaskComponent } from './components/pages/all-task/all-task.component';
import { UserTaskComponent } from './components/pages/user-task/user-task.component';
import { UpdateTaskComponent } from './components/pages/update-task/update-task.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'mytask', component: UserTaskComponent },
      { path: 'task', component: AllTaskComponent },
      { path: 'task/:id', component: UpdateTaskComponent },
      { path: '', redirectTo: 'mytask', pathMatch: 'full'},
      { path: '**', redirectTo: 'mytask', pathMatch: 'full' }
    ])
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
