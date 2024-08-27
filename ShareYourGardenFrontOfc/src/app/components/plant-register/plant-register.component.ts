import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantInterface } from '../../interfaces/plant-interface';
import { PlantRegisterFormComponent } from '../plant-register-form/plant-register-form.component';
import { PlantService } from '../../services/plant.service';
import { BackButtonComponent } from '../back-button/back-button.component';
import { lastValueFrom } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { LogoutButtonComponent } from "../logout-button/logout-button.component";

@Component({
  selector: 'app-plant-register',
  standalone: true,
  imports: [PlantRegisterFormComponent, BackButtonComponent, LogoutButtonComponent],
  templateUrl: './plant-register.component.html',
})
export class PlantRegisterComponent {
  newPlant!: boolean;
  plant!: PlantInterface;
  route = inject(ActivatedRoute);
  plantService = inject(PlantService);
  loginService= inject(LoginService)
  gardener = this.loginService.getLoggedGardener();
  ngOnInit() {
    let path = this.route.routeConfig?.path;
    if (path == 'editplant/:id') {
      this.newPlant = false;
    } else {
      this.newPlant = true;
    }
  }
}
