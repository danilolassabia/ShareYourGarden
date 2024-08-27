import { Component, inject, Input } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { GardenerInterface } from '../../interfaces/gardener-interface';
import { PlantInterface } from '../../interfaces/plant-interface';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { GardenerService } from '../../services/gardener.service';

@Component({
  selector: 'app-plant-register-form',
  standalone: true,
  imports: [BackButtonComponent, ReactiveFormsModule],
  templateUrl: './plant-register-form.component.html',
  styleUrls: ['./plant-register-form.component.css'],
})
export class PlantRegisterFormComponent {
  loginService = inject(LoginService);
  gardenerService = inject(GardenerService);
  plantService = inject(PlantService);
  router = inject(Router);
  private fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  plant!: PlantInterface;
  isNull: boolean = false;
  gardener = this.loginService.getLoggedGardener();
  selectedFile: File | null = null;
  existingImage: string | null = null;

  ngOnInit() {
    let path = this.route.routeConfig?.path;
    if (path === 'editplant/:id') {
      this.route.paramMap.subscribe(async (params) => {
        let plantId = Number(params.get('id'));
        await this.getPlant(plantId);
        this.populateForm();
        this.loadImage();
      });
    }
  }

  plantRegisterForm = this.fb.group({
    id: [0],
    popularName: [''],
    scientificName: [''],
    enviromentLightType: ['Tipo de Luz'],
    enviromentClimateType: ['Tipo de Clima'],
    size: ['Tamanho'],
    plantingDate: [null as string | null],
    lastPruning: [null as string | null],
    lastFertilization: [null as string | null],
    floweringSeason: ['Época de Floração'],
    fertilizationFrequency: [0],
    wateringFrequency: [0],
    gardenerId: [this.gardener.id],
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async registerPlant() {
    if (!this.plantRegisterForm.controls.popularName.value) {
      this.isNull = true;
    } else {
      const formData = new FormData();
      const plant = this.plantRegisterForm.value as PlantInterface;

      formData.append('plantData', JSON.stringify(plant));

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else if (this.existingImage) {
        formData.append(
          'image',
          this.dataURItoBlob(this.existingImage),
          'existingImage.jpg'
        );
      }

      if (plant.id) {
        await lastValueFrom(this.plantService.updatePlant(plant.id, formData));
      } else {
        await lastValueFrom(this.plantService.addPlant(formData));
        this.gardener.id = Number(this.gardener.id);
        let updatedGardener = await lastValueFrom(
          this.gardenerService.getGardener(this.gardener.id)
        );
        updatedGardener.plants += 1;
        updatedGardener = await lastValueFrom(
          this.gardenerService.updateGardener(this.gardener.id, updatedGardener)
        );
      }
      this.isNull = false
      this.router.navigate([`garden/${this.gardener.id}`]);
    }
  }

  async getPlant(id: number) {
    this.plant = await lastValueFrom(this.plantService.getPlant(id));
  }

  populateForm() {
    this.plantRegisterForm.controls.id.setValue(this.plant.id ?? null);
    this.plantRegisterForm.controls.popularName.setValue(
      this.plant.popularName ?? null
    );
    this.plantRegisterForm.controls.scientificName.setValue(
      this.plant.scientificName ?? null
    );
    this.plantRegisterForm.controls.enviromentLightType.setValue(
      this.plant.enviromentLightType ?? null
    );
    this.plantRegisterForm.controls.enviromentClimateType.setValue(
      this.plant.enviromentClimateType ?? null
    );
    this.plantRegisterForm.controls.size.setValue(this.plant.size ?? null);
    this.plantRegisterForm.controls.plantingDate.setValue(
      this.plant.plantingDate ? this.formatDate(this.plant.plantingDate) : null
    );
    this.plantRegisterForm.controls.lastPruning.setValue(
      this.plant.lastPruning ? this.formatDate(this.plant.lastPruning) : null
    );
    this.plantRegisterForm.controls.lastFertilization.setValue(
      this.plant.lastFertilization
        ? this.formatDate(this.plant.lastFertilization)
        : null
    );
    this.plantRegisterForm.controls.floweringSeason.setValue(
      this.plant.floweringSeason ?? null
    );
    this.plantRegisterForm.controls.fertilizationFrequency.setValue(
      this.plant.fertilizationFrequency ?? 0
    );
    this.plantRegisterForm.controls.wateringFrequency.setValue(
      this.plant.wateringFrequency ?? 0
    );
  }

  loadImage() {
    if (this.plant.image) {
      this.existingImage = `data:image/jpeg;base64,${this.plant.image}`;
    }
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = window.atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  removeImage() {
    this.existingImage = null;
  }
}
