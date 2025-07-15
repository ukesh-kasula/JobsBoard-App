import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jobs } from '../models/jobs.model';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-application',
  imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterLink],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  protected applicationForm!: FormGroup;
  protected toastr = inject(ToastrService);
  private activeRout:ActivatedRoute = inject(ActivatedRoute)
  protected jobId!:number
  private jobsService:JobsService = inject(JobsService)
  protected jobList!:jobs[]
  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      dob: [''],
      gender: [''],
      address: [''],
      qualification: ['', Validators.required],
      resume: [null, Validators.required],
      coverLetter: [''],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
      linkedin: [''],
      preferredLocation: [''],
      experience: [0, [Validators.required, Validators.min(0)]],
      noticePeriod: [''],
    });
    this.activeRout.queryParamMap.subscribe((data)=>{
      this.jobId = Number(data.get('job') || '')
      if(this.jobId){
        this.jobList = this.jobsService.jobsList.filter((res)=>{
          return res.id==this.jobId
        })
      }
    })
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.patchValue({ resume: file });
    }
  }
  get skillControls() {
    return (<FormArray>this.applicationForm.get('skills')).controls;
  }
  addSkill() {
    (<FormArray>this.applicationForm.get('skills')).push(
      this.fb.control(null, Validators.required)
    );
  }
  deleteSkill(val: number) {
    (<FormArray>this.applicationForm.get('skills')).removeAt(val);
  }
  submitApp() {
    console.log(this.applicationForm);
    this.toastr.success('your Application was submitted Successfully!');
    this.applicationForm.reset()
  }
}
