import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  template: `
    <a [href]="path">
      <span class="icon-text">
        <span class="icon">
          <i class="fa-solid fa-backward"></i>
        </span>
        <span class="text">Voltar</span>
      </span>
    </a>
  `,
  styles: `.icon-text{
    position: absolute;
    left: 0;
    color: white;
    margin-top: 15px;
    margin-left: 15px;
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
export class BackButtonComponent {
  @Input() path!: string;
  ngOnInit(){
    console.log(this.path)
  }
}
