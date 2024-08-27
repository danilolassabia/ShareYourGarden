import { Component, inject, Input } from '@angular/core';
import { PlantInterface } from '../../interfaces/plant-interface';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { lastValueFrom } from 'rxjs';
import { GardenerService } from '../../services/gardener.service';

@Component({
  selector: 'app-plant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.css'],
})
export class PlantCardComponent {
  plantService = inject(PlantService);
  gardenerService = inject(GardenerService);
  @Input() plant!: PlantInterface;
  @Input() isGardenOwner!: boolean;

  openModal(plantId: any) {
    const modal = document.getElementById(`modal-${plantId}`) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  closeModal(plantId: any) {
    const modal = document.getElementById(`modal-${plantId}`) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  async deletePlant(id: any) {
    await lastValueFrom(this.plantService.deletePlant(id));
    let gardener = await lastValueFrom(this.gardenerService.getGardener(this.plant.gardenerId))
    gardener.plants -=1;
    await lastValueFrom(this.gardenerService.updateGardener(this.plant.gardenerId, gardener))
    this.closeModal(id);
    window.location.reload();
  }
}
