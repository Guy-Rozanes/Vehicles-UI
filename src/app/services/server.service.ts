import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {configuration} from '../../configuration/configuration';
import {Observable} from 'rxjs';
import VehicleModel from '../models/vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllVehicle(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`${configuration.baseUrl}/vehicle`);
  }

  createVehicle(vehicle: VehicleModel): Observable<any> {
    return this.http.post<any>(`${configuration.baseUrl}/vehicle`, JSON.stringify(vehicle), this.httpOptions);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${configuration.baseUrl}/vehicle/${id}`);
  }

  editVehicle(vehicle: VehicleModel): Observable<any> {
    return this.http.put<any>(`${configuration.baseUrl}/vehicle/${vehicle.id}`, JSON.stringify(vehicle), this.httpOptions);
  }

}
