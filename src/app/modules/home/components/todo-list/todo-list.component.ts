import { TaskList } from '../../model/task-list';
import { Component, DoCheck, OnInit } from '@angular/core';




@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]') ;
  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
      this.setLoaclStorage();
  }

  public setEmitTaskList(event: string){
      this.taskList.push({task: event, checked: false})
  }

  public deleteTask(event: number){
    this.taskList.splice(event, 1)
  }

  public deleteAll(){
    const confirm = window.confirm("!!! Tem certeza que deseja deletar tudo? !!!")

    if(confirm){
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja deletar?")

      if(confirm){
        this.deleteTask(index)
      }
    }
  }

  public setLoaclStorage(){
    this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))

      if(this.taskList){
        localStorage.setItem("list", JSON.stringify(this.taskList))
      }
  }

}
