import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { jobs } from '../models/jobs.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-posts',
  imports: [CommonModule, RouterLink, NgxSkeletonLoaderModule, FormsModule],
  templateUrl: './job-posts.component.html',
  styleUrl: './job-posts.component.css',
})
export class JobPostsComponent implements OnInit {
  private jobService: JobsService = inject(JobsService);
  protected jobList!: jobs[];
  protected jobListBackup!: jobs[];
  private router: Router = inject(Router);
  protected serachedJob!: string;
  protected isloading: boolean = true;
  protected noMatchesFound: boolean = false;
  protected isshow: boolean = false;

  onSearch(): void {
    const searchKey = this.serachedJob?.toLowerCase().trim();

    if (!searchKey) {
      this.jobList = this.jobListBackup;
      this.noMatchesFound = false;
      this.isshow = false;
      return;
    }

    this.jobList = this.jobListBackup.filter((res) =>
      res.jobrole.toLowerCase().includes(searchKey)
    );

    this.noMatchesFound = this.jobList.length === 0;
    this.isshow = this.jobList.length <= 3;
    console.log(this.jobList.length);
  }
  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe((jobs: jobs[]) => {
      this.jobList = jobs;
      this.jobListBackup = jobs;
      this.isloading = false;
    });
  }
  apply(val:number){
    this.router.navigate(['/applicationForm'],{queryParams:{job: val}});
  }
}
