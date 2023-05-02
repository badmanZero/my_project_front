import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Type, User, State, Task, TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  //name = "name";
  errors: string = '';
  isError = false;
  states: State[] = [];
  users: User[] = [];
  types: Type[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getStates();
    this.getUsers();
    this.getTypes();
  }

  getStates() {
    this.taskService
        .getStates()
        .subscribe(
          states => {
              this.states = states;
            }
        );
  }

  getUsers() {
    this.taskService
        .getUsers()
        .subscribe(
          users => {
              this.users = users;
            }
        );
  }

  getTypes() {
    this.taskService
        .getTypes()
        .subscribe(
          types => {
              this.types = types;
            }
        );
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    if(f.valid){
      this.addTask(f.value);
    }else{
      this.errors = 'Au moins un champ obligatoire n\'est pas renseigné';
      this.isError = true;
    }
    
  }

  addTask(task: Task) {
    //this.isLoading = true;
    this.taskService
        .addTask(task)
        .subscribe({
          error: err => {
            if(err.error.errors == undefined){
              this.errors = err.error.detail;
            }else{
              this.errors = err.error.errors;
            }
            this.isError = true;
          },
          complete: () => {
            console.log('DONE!');
            window.location.href = "http://localhost:4200/tasks";
          }
        });
  }

}
