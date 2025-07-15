import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';


import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { jobs } from '../models/jobs.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChatService } from '../services/aichat.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-ajob',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSkeletonLoaderModule,
    RouterLink
  ],
  templateUrl: './post-ajob.component.html',
  styleUrl: './post-ajob.component.css',
})
export class PostAJobComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  protected postingForm!: FormGroup;
  private jobservice: JobsService = inject(JobsService);
  private aiChat: ChatService = inject(ChatService);
  protected postedJobs!: jobs;
  protected isLoading:boolean = false
  toastr = inject(ToastrService);
  ngOnInit() {
    this.postingForm = this.fb.group({
      id: [this.jobservice.jobsList.length + 1],
      jobid: [null, Validators.required],
      jobrole: [null, Validators.required],
      Companyname: [null, Validators.required],
      location: [null, Validators.required],
      salary: [null, Validators.required],
      jobtype: [null, Validators.required],
      Description: [null, Validators.required],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
      Qualifications: [null, Validators.required],
    });
  }
  generateDes() {
    const aiPrompt = `You are an expert HR assistant.
      Based on the following inputs:
    - Job Role: ${this.postingForm.get('jobrole')?.value}
    - Company: ${this.postingForm.get('Companyname')?.value}
    - Skills: ${this.postingForm.get('skills')?.value}
    -Qualifications: ${this.postingForm.get('Qualifications')?.value}

    Generate **only** a concise job description in **exactly 4 bullet points**.

    Important Instructions:
    - Do NOT include the job title
    - Do NOT mention the company name
    - Do NOT add a title, heading, or summary
    - Only output 4 clear, specific, and relevant bullet points describing the job responsibilities or expectations.
`;
this.isLoading=true
    this.aiChat.sendMessage(aiPrompt).subscribe((res) => {
      this.postingForm.get('Description')?.patchValue(res);
      this.isLoading=false

    });
  }
  get skillControls() {
    return (<FormArray>this.postingForm.get('skills')).controls;
  }

  addSkill() {
    (<FormArray>this.postingForm.get('skills')).push(
      this.fb.control(null, Validators.required)
    );
  }
  deleteSkill(val: number) {
    (<FormArray>this.postingForm.get('skills')).removeAt(val);
  }
  onSubmit() {
    console.log(this.postingForm);
    this.postedJobs = this.postingForm.value;
    console.log(this.postedJobs);
    this.jobservice.jobsList.push(this.postedJobs);
    this.toastr.success('your Job was posted Successfully!');
    this.postingForm.reset()
  }
}
