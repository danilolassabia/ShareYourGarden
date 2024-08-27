import { Component } from '@angular/core';
import { PlantCardComponent } from '../plant-card/plant-card.component';
import { PlantInterface } from '../../interfaces/plant-interface';
import { PlantService } from '../../services/plant.service';
import { LogoutButtonComponent } from "../logout-button/logout-button.component";

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [PlantCardComponent, LogoutButtonComponent],
  templateUrl: './plant-list.component.html',
  styles: `p{
  color: black;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100vw;
  text-align: center;
  padding: 10px
}
a{
  font-weight: bold;
  text-decoration: underline;
}
a:hover{
  color: black;
}`,
})
export class PlantListComponent {
  plants: PlantInterface[] = [];
  token: any = localStorage.getItem('token');

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe((data) => {
      this.plants = data;
    });
  }
}
