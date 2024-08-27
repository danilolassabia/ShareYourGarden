import { Component } from '@angular/core';
import { GardenerInterface } from '../../interfaces/gardener-interface';
import { GardenerService } from '../../services/gardener.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { PlantInterface } from '../../interfaces/plant-interface';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-gardeners',
  standalone: true,
  imports: [LogoutButtonComponent],
  templateUrl: './gardeners.component.html',
  styleUrl: './gardeners.component.css',
})
export class GardenersComponent {
  gardeners: GardenerInterface[] = [];
  plants: PlantInterface[] = [];

  constructor(private gardenerService: GardenerService) {}

  ngOnInit(): void {
    this.gardenerService.getGardeners().subscribe((data) => {
      this.gardeners = data;
    });
  }
}
