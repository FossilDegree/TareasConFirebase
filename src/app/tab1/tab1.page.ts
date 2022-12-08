import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  //public tasks: string[];
  public task: string;
  public tasks: Task[]=[];
  constructor(private taskService: TaskService) {
    // this.tasks=this.taskService.getTasks();
    // this.task='algo';
    this.taskService.getTask().subscribe(res=>{ 
      this.tasks=res.filter(t=>t.status==='pendiente');
    })
  }

  public addTask(){
    let newTask:Task = {
      name:this.task,
      status:"pendiente"
    };
    this.taskService.newTask(newTask);
    this.task='';
    // this.taskService.addTask(this.task);
    // this.tasks=this.taskService.getTasks();
    // console.log(this.tasks);
    // this.task='';

  }
  public removeTask(id: string){
    // this.taskService.deleteTask(pos);
    // //console.log(this.taskService.getCompTasks());
    // this.tasks=this.taskService.getTasks();
    this.taskService.deleteTask(id);
  }
  public completeTask(id: string){
    this.taskService.completeTask(id);
    // this.taskService.completeTask(pos);
    // console.log(this.taskService.getCompTasks());
    // this.tasks=this.taskService.getTasks();
  }

}
