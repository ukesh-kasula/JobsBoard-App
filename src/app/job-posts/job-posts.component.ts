import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { jobs } from '../models/jobs.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { apiService } from '../services/api.service';

@Component({
  selector: 'app-job-posts',
  imports: [CommonModule, RouterLink, NgxSkeletonLoaderModule, FormsModule],
  templateUrl: './job-posts.component.html',
  styleUrl: './job-posts.component.css',
})
export class JobPostsComponent implements OnInit {
  private apiService: apiService = inject(apiService);
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
    this.apiService.getJobsData().subscribe((jobs: jobs[]) => {
      this.jobList = jobs;
      this.jobListBackup = jobs;
      setTimeout(() => {
        this.isloading = false;
      }, 1000);
    });
  }
  apply(val: number) {
    this.router.navigate(['/applicationForm'], { queryParams: { job: val } });
  }
}
