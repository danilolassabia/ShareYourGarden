import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GardenerInterface } from '../../interfaces/gardener-interface';
import { GardenerService } from '../../services/gardener.service';
import { PlantInterface } from '../../interfaces/plant-interface';
import { PlantCardComponent } from '../plant-card/plant-card.component';
import { LoginService } from '../../services/login.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { PlantService } from '../../services/plant.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-garden',
  standalone: true,
  imports: [PlantCardComponent, LogoutButtonComponent, CommonModule],
  templateUrl: './garden.component.html',
  styleUrl: './garden.component.css',
})
export class GardenComponent {
  gardener!: GardenerInterface;
  plants!: PlantInterface[];
  isGardenOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private gardenerService: GardenerService,
    private loginService: LoginService,
    private plantService: PlantService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let gardenerId = Number(params.get('id'));
      this.gardenerService.getGardener(gardenerId).subscribe((data) => {
        this.gardener = data;
        let loggedGardener = this.loginService.getLoggedGardener();
        if (this.gardener.id == loggedGardener.id) {
          this.isGardenOwner = true;
        }
      });
      this.plantService.getPlants().subscribe((data) => {
        this.plants = data;
      });
    });
  }

  async updateLikes() {
    this.gardener.likes += 1;
    await lastValueFrom(
      this.gardenerService.updateGardener(
        Number(this.gardener.id),
        this.gardener
      )
    );
  }
}
