import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[]=[];         //Tareas pendientes
  private compTasks: string[] = [];   //Tareas completadas
  constructor(private firestore:AngularFirestore) {
    //Tener informacion al inicio
    this.tasks.push('Tarea 1');
    this.tasks.push('Tarea 2');
   }
   //Añadir metodos para manejar tareas
   //Recuperar tareas
   public getTasks(): string[]{
    return this.tasks;
   }
   public getTask():Observable<Task[]>{
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
    )
   }

   //Recuperar tareas completas
   public getCompTasks(): string[]{
    return this.compTasks;
   }
   //Añadir tarea
   public addTask(task: string){
    this.tasks.push(task);
   }
   public newTask(task:Task){
    this.firestore.collection('tasks').add(task);
   }
   //Borrar tarea
   public deleteTask(id: string){
    //this.compTasks.push(this.tasks[pos]);
    // this.tasks.splice(pos,1);
    this.firestore.collection('tasks').doc(id).delete();
   }
   //Borra una tarea de tareas completas y la pone en tareas
   public uncompleteTask(id: string){
    // this.tasks.push(this.compTasks[pos]);
    // this.compTasks.splice(pos,1);
    this.firestore.collection('tasks').doc(id).update({status:"pendiente"});
   }

   //Completa una tarea y la borra de tareas
   public completeTask(id: string){
    // this.compTasks.push(this.tasks[pos]);
    // this.deleteTask(pos);
    this.firestore.collection('tasks').doc(id).update({status:"completa"});
   }

}
