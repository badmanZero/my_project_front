import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task: any = [];

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
    
      console.log(id);
      this.getTask(id)
    });
  }

  getTask(id: string) {
    this.taskService
        .getTaskById(id)
        .subscribe({
          next: data => {
            console.log(data);
            this.task = data;
          },
          error: err => {
            console.error(err);
          },
          complete: () => {
            console.log();
          }
        });
  }

}
