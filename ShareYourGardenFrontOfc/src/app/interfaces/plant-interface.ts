import { GardenerInterface } from "./gardener-interface";

export interface PlantInterface {
    id?: number;
    popularName: string;
    scientificName?: string;
    enviromentLightType?: string;
    enviromentClimateType?: string;
    size?: string;
    plantingDate?: Date;
    lastPruning?: Date;
    lastFertilization?: Date;
    floweringSeason?: string;
    fertilizationFrequency?: number;
    wateringFrequency?: number;
    gardenerId: number;
    image?: any;
  }
  