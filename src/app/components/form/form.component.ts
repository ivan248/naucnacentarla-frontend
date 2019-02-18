import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form : any;
  taskId: any;

  constructor(private taskService:TasksService,
              private router: Router) { }

  ngOnInit() {
    var retrievedObject = localStorage.getItem('form');
    this.form = JSON.parse(retrievedObject);
    this.taskId = localStorage.getItem('taskId');
  }

  submitForm(formValue, f) {
    console.log(formValue);
    console.log(f);
    this.taskService.executeTask(formValue, this.taskId)
    .subscribe( data => {
      console.log(data);
      this.router.navigate(['/tasks']);
    }
    )
  }

}
