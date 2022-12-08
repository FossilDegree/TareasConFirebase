import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public comptasks: Task[];
  public task: string;
  constructor(private taskService: TaskService) {
    // this.comptasks=this.taskService.getCompTasks();
    // console.log(this.comptasks);
    this.taskService.getTask().subscribe(res=>{ 
      this.comptasks=res.filter(t=>t.status==='completa');
    })
  }

  public unremoveTask(id: string){
    // this.taskService.uncompleteTask(pos);
    // this.comptasks=this.taskService.getCompTasks();
    this.taskService.uncompleteTask(id);
  }
}
