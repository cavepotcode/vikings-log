import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.less']
})
export class NewProjectComponent implements OnInit {

  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectSvc: ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      apikey: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  public submit(): void {
    /*if (!this.projectForm.valid) {
      return;
    }*/
    this.projectSvc.create({
      apiKey: this.projectForm.value.apikey,
      title: this.projectForm.value.name,
      type: this.projectForm.value.type
    }).subscribe((data) => {
      console.log(data);
      this.router.navigate(['private/projects']);
    });
  }

}
