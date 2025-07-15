import { Injectable } from '@angular/core';
import { jobs } from '../models/jobs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  jobsList: jobs[] = [
    {
      id: 1,
      jobid: 1001,
      jobrole: 'Frontend Developer',
      Companyname: 'TechNova Solutions',
      location: 'Bangalore, India',
      salary: 700000,
      jobtype: 'Full-time',
      Description:
        'We are looking for a skilled frontend developer with experience in Angular and TypeScript.',
      skills: ['angular','vue','bootstrap'],
      Qualifications:
        'B.E./B.Tech in Computer Science or related field, 1-2 years of experience.',
    },
    {
      id: 2,
      jobid: 1002,
      jobrole: 'Backend Engineer',
      Companyname: 'Innovent Labs',
      location: 'Hyderabad, India',
      salary: 850000,
      jobtype: 'Full-time',
      Description:
        'Join our backend team to build scalable APIs and services using Node.js and MongoDB.',
        skills: ['c#','PHP'],
      Qualifications:
        'Strong knowledge of backend systems, databases, and RESTful APIs.',
    },
    {
      id: 3,
      jobid: 1003,
      jobrole: 'UI/UX Designer',
      Companyname: 'PixelBloom Studio',
      location: 'Remote',
      salary: 600000,
      jobtype: 'Contract',
      Description:
        'Create user-centered designs and improve product experience with your UI/UX skills.',
      skills: ['Figma','Canva'],
      Qualifications:
        'Design degree preferred, portfolio of previous UI/UX projects is a must.',
    },
    {
      id: 4,
      jobid: 1004,
      jobrole: 'Data Analyst',
      Companyname: 'DataVista',
      location: 'Pune, India',
      salary: 750000,
      jobtype: 'Full-time',
      Description:
        'Analyze datasets to uncover insights and assist decision-making for clients.',
        skills: ['PoweBI','exel'],
      Qualifications:
        'Strong in SQL, Excel, and data visualization tools like Power BI or Tableau.',
    },
    {
      id: 5,
      jobid: 1005,
      jobrole: 'DevOps Engineer',
      Companyname: 'CloudSphere',
      location: 'Chennai, India',
      salary: 900000,
      jobtype: 'Full-time',
      Description:
        'Automate deployments, manage CI/CD pipelines, and ensure system reliability.',
        skills: ['Azure','AWS'],
      Qualifications:
        'Experience with AWS, Docker, Jenkins, and Linux administration.',
    },
    {
      id: 6,
      jobid: 1006,
      jobrole: 'Mobile App Developer',
      Companyname: 'AppXperts Pvt Ltd',
      location: 'Delhi, India',
      salary: 720000,
      jobtype: 'Full-time',
      Description:
        'Develop cross-platform mobile apps using Flutter. Maintain and improve app performance.',
        skills: ['Flutter','python'],
      Qualifications: 'B.E./B.Tech, Experience in Flutter, Dart, Firebase.',
    },
    {
      id: 7,
      jobid: 1007,
      jobrole: 'Machine Learning Engineer',
      Companyname: 'AI Nexus',
      location: 'Remote',
      salary: 1100000,
      jobtype: 'Remote',
      Description:
        'Build and deploy ML models for real-world applications in healthcare and finance.',
        skills: ['python','Machine learing'],
      Qualifications:
        'Strong Python skills, TensorFlow/PyTorch, Statistics, and problem solving.',
    },
    {
      id: 8,
      jobid: 1008,
      jobrole: 'Product Manager',
      Companyname: 'QuickStart Ventures',
      location: 'Mumbai, India',
      salary: 1300000,
      jobtype: 'Full-time',
      Description:
        'Lead product development from ideation to launch. Collaborate with cross-functional teams.',
        skills: ['data Visulaization','Power BI'],
      Qualifications:
        'MBA preferred, excellent communication & leadership skills.',
    },
    {
      id: 9,
      jobid: 1009,
      jobrole: 'Quality Assurance Tester',
      Companyname: 'SoftCheck Systems',
      location: 'Kolkata, India',
      salary: 500000,
      jobtype: 'Internship',
      Description:
        'Test web and mobile applications for bugs and usability issues.',
        skills: ['Cypress','Automation Testing'],
      Qualifications: 'Basic knowledge of software testing, freshers welcome.',
    },
    {
      id: 10,
      jobid: 1010,
      jobrole: 'Full Stack Developer',
      Companyname: 'NextGen Coders',
      location: 'Ahmedabad, India',
      salary: 950000,
      jobtype: 'Full-time',
      Description:
        'Work on both frontend and backend of scalable web applications.',
        skills: ['angular','vue','c#','python'],
      Qualifications:
        'Experience with Angular/React, Node.js, Express, MongoDB.',
    },
  ];

   getAllJobs():Observable<jobs[]>{
        return new Observable((sub)=> {
            setTimeout(()=>{
                sub.next(this.jobsList)

            },2000)
        })
    }
}
