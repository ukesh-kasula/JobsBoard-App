import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadersComponent } from './headers/headers.component';
import { FootersComponent } from './footers/footers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeadersComponent,FootersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JobPostingApplication';
}
