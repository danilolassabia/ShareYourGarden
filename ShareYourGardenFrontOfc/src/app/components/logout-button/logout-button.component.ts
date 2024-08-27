import { Component } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  template: `
    @if(token){
    <a href="/login">
      <span class="icon-text">
        <span class="text">Log-out</span>
        <span class="icon">
          <i class="fa-solid fa-right-from-bracket"></i>
        </span>
      </span>
    </a>
    }
  `,
  styles: `.icon-text{
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    margin-top: 22px;
    margin-right: 20px;
  }
  
  .icon-text:hover{
    color: rgb(255, 179, 0);
    cursor: pointer;
  }

  .text{
    transition-duration: 294ms;
  }
  
  .text:hover{
    transition-duration: 294ms;
  }`,
})
export class LogoutButtonComponent {
  token = localStorage.getItem('token');
}
