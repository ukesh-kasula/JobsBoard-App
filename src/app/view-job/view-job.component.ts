import { Component, inject, OnInit } from '@angular/core';
import { jobs } from '../models/jobs.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobsService } from '../services/jobs.service';
import { CommonModule } from '@angular/common';
import { apiService } from '../services/api.service';

@Component({
  selector: 'app-view-job',
  imports: [RouterLink,CommonModule],
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.css'
})
export class ViewJobComponent implements OnInit {
  singleJob!: jobs | undefined;
  activeId!:number
  activeRoute:ActivatedRoute = inject(ActivatedRoute)
  private router:Router = inject(Router)
  private apiService:apiService = inject(apiService)
  protected isloading:boolean = true

ngOnInit() {
  this.activeRoute.paramMap.subscribe((data)=>{
    this.activeId = Number(data.get("id"))
    this.apiService.singleJob(this.activeId).subscribe((jobs:jobs)=>{
      this.singleJob = jobs
      this.isloading = false
    })
  })
    
}
get descriptionPoints(): string[] {
  const desc = this.singleJob?.Description || '';
  return desc.split(/\d+\.\s*/).filter(point => point.trim() !== '');
}
apply(val:number | undefined){
    this.router.navigate(['/applicationForm'],{queryParams:{job: val}});
  }

}
