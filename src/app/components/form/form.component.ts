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
  reviewerForm: boolean = false;
  public reviewerIds;

  constructor(private taskService:TasksService,
              private router: Router) { }

  ngOnInit() {
    var retrievedObject = localStorage.getItem('form');
    this.form = JSON.parse(retrievedObject);
    console.log('Forma:::');
    if(this.form[0].id === 'reviewerId') {
      this.reviewerForm = true;
    }
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

  submitReviewers() {
    console.log('Reviewer ids: ');
    console.log(this.reviewerIds);
    console.log('Reviewer ids after split: ');
    console.log(this.reviewerIds.split(','));
    console.log('Reviewer ids after json stringify: ');
    console.log(JSON.stringify(this.reviewerIds.split(',')))

    let body = { reviewers: this.reviewerIds.split(',')}
    this.taskService.executeTaskReviewers(body, this.taskId)
      .subscribe( (res: any) => {
        console.log('Succesfully executed executeTaskReviewers.');
        console.log(res);
        this.router.navigate(['/tasks']);
      });
  }

}
