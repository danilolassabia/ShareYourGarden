import { Component } from '@angular/core';
import { LogoutButtonComponent } from "../logout-button/logout-button.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LogoutButtonComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
