import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  errorMessage: string = "";
  isLoading: string = 'true';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  filterItemsOfType(type: String){
    return this.tasks.filter(x => x.etat == type);
    //return this.items.filter(x => x.data.type == type);
  }

  getTasks() {
    this.taskService
        .getTasks()
        .subscribe(
          tasks => {
              this.tasks = tasks;
              this.isLoading = 'true';
            },
            error => this.errorMessage = <any>error
        );
  }
}
