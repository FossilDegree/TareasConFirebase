import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[]=[];
  private compTasks: string[] = [];
  constructor() {
    //Tener informacion al inicio
    this.tasks.push('Tarea 1');
    this.tasks.push('Tarea 2');
   }
   //Añadir metodos para manejar tareas
   public getTasks(): string[]{
    return this.tasks;
   }
   public getCompTasks(): string[]{
    return this.compTasks;
   }
   public addTask(task: string){
    this.tasks.push(task);
   }
   public deleteTask(pos: number){
    this.compTasks.push(this.tasks[pos]);
    this.tasks.splice(pos,1);
   }
   public undeleteTask(pos: number){
    this.tasks.push(this.compTasks[pos]);
    this.compTasks.splice(pos,1);
   }

}
