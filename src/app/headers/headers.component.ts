import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'headers',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css',
})
export class HeadersComponent implements OnInit {
  protected auth: AuthService = inject(AuthService);
  private document: Document = inject(DOCUMENT)
  protected img:any
  ngOnInit(): void {
      this.auth.user$.subscribe({
        next:((img)=>{
          this.img = img?.picture
          console.log(this.img);
          
        })
      })
  }
  logIn(){
    this.auth.loginWithPopup()
  }
  logOut(){
   this.auth.logout({ logoutParams: { returnTo: this.document.location.origin } })
  }
}
