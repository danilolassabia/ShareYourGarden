import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GardenerInterface } from '../interfaces/gardener-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GardenerService {
  apiUrl = 'http://localhost:8080/api/gardener';

  constructor(private http: HttpClient) {}

  getGardeners(): Observable<GardenerInterface[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<GardenerInterface[]>(`${this.apiUrl}/listAll`, {
      headers,
    });
  }

  getGardener(id: number): Observable<GardenerInterface> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<GardenerInterface>(`${this.apiUrl}/${id}`, {
      headers,
    });
  }

  addGardener(gardener: GardenerInterface): Observable<GardenerInterface> {
    return this.http.post<GardenerInterface>(
      `${this.apiUrl}/newGardener`,
      gardener
    );
  }

  updateGardener(id: number, gardener: GardenerInterface): Observable<GardenerInterface> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<GardenerInterface>(
      `${this.apiUrl}/update/${id}`,
      gardener,
      { headers }
    );
  }
}
