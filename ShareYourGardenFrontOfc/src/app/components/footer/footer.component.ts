import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <p>Danilo Lassabia | Share Your Garden ©</p>
    </footer>
  `,
  styles: `footer{
    text-align: center;
    background-color: rgb(64, 85, 20);
    position: fixed;
    bottom: 0;
    width: 100%;
}

p{
    margin: 0;
    color: black;
}`,
})
export class FooterComponent {}
