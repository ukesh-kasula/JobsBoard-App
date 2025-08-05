import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jobs } from '../models/jobs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  private http: HttpClient = inject(HttpClient);
  getJobsData(): Observable<jobs[]> {
    return this.http.get<jobs[]>(
      'https://68357839cd78db2058c1a562.mockapi.io/api/v2/jobs'
    );
  }
  postJob(body: jobs[]): Observable<jobs[]> {
    return this.http.post<jobs[]>(
      'https://68357839cd78db2058c1a562.mockapi.io/api/v2/jobs',
      body
    );
  }
  singleJob(id:number): Observable<jobs>{
    return this.http.get<jobs>('https://68357839cd78db2058c1a562.mockapi.io/api/v2/jobs/'+id)
  }
}
