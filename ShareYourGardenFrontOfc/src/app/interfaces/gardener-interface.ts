import { PlantInterface } from "./plant-interface";

export interface GardenerInterface{
    id?: number,
    name: string,
    username: string,
    password: string,
    role: string,
    likes: number,
    plants: number
}