import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlantInterface } from '../interfaces/plant-interface';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  apiUrl = 'http://localhost:8080/api/plant';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<PlantInterface[]> {
    return this.http.get<PlantInterface[]>(`${this.apiUrl}/listAll`);
  }

  getPlant(id: number): Observable<PlantInterface> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<PlantInterface>(`${this.apiUrl}/${id}`, { headers });
  }

  addPlant(formData: FormData): Observable<PlantInterface> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<PlantInterface>(`${this.apiUrl}/newPlant`, formData, {
      headers,
    });
  }

  updatePlant(id: number, formData: FormData): Observable<PlantInterface> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<PlantInterface>(
      `${this.apiUrl}/update/${id}`,
      formData,
      { headers }
    );
  }

  deletePlant(id: number): Observable<PlantInterface> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<PlantInterface>(`${this.apiUrl}/delete/${id}`, {
      headers,
    });
  }
}
