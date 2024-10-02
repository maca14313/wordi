import { Component, DoCheck, Input, OnInit, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, NgControl, ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { response } from 'express';
import { error } from 'console';
import { ExerciseComponent } from '../exercise/exercise.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,ReactiveFormsModule,FormsModule,ExerciseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, DoCheck {

  TaskName='';
  taskList:any[] = [];

  testChange:any=1;
  private previousData: any;

  //@Input() selectedItem!:'selectedItem';
  //apiService=inject(ApiServiceService)

  ngDoCheck(){
    if(this.testChange!==this.previousData){
      //alert('change'+this.previousData)
    }
  }
/*
@Input() data: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      console.log('Data changed:', changes.data.currentValue);
      // Perform your actions here
    }
  }
  }*/

  applyForm = new FormGroup({
    taskName: new FormControl(''),
  })



constructor(private apiService:ApiServiceService){}
route: ActivatedRoute = inject(ActivatedRoute);

isActive: boolean = true;

  toggleActive() {
    this.isActive = !this.isActive;
  }


  isHighlighted: boolean = false;

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  }


ngOnInit() :void {
  this.getTasks()
}

   getTasks(){
    this.apiService.getTaskApi().subscribe(
      response =>{
        this.taskList=response.allTasks
      console.log('Task fetched successfully:', response);
    },
    error => {
      console.error('Error creating task:', error);
    })
   }

   submitApplication(){
 const title=this.applyForm.value.taskName ?? '';
 this.TaskName=title

 this.apiService.createTaskApi({title}).subscribe(
  response => {
    if (response.success) {
      this.getTasks()
      alert('task created')
    }
  },
  error => {
    alert(error)
    console.error('Error creating task:', error);
  }
);

  }

  deleteTask(id:number){
  this.apiService.deleteTaskApi(id).subscribe(
    response=>{
      alert('task deleted')
      this.getTasks()
      console.log(response)
  },
  error =>{

  }

  )
  }

}
