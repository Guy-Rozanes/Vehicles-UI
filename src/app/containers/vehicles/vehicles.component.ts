import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ServerService} from '../../services/server.service';
import {Observable} from 'rxjs';
import VehicleModel from '../../models/vehicle/vehicle.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {VehicleDialogComponent} from '../../components/vehicle-dialog/vehicle-dialog.component';
import _ from 'lodash';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  private vehicles: VehicleModel[];
  private selectedVehcile: VehicleModel;

  constructor(private service: ServerService,
              public matDialog: MatDialog,
              public matSnackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.getAllVehicles();

  }

  getAllVehicles() {
    this.service.getAllVehicle().subscribe(data => {
      this.vehicles = data;
      console.log(this.vehicles);
    });
  }

  chooseVehicle(vehcile: VehicleModel) {
    console.log(vehcile);
    if (this.selectedVehcile) {
      if (this.selectedVehcile.id === vehcile.id) {
        this.selectedVehcile = null;
      } else {
        this.selectedVehcile = vehcile;
      }
    } else {
      this.selectedVehcile = vehcile;
    }
  }

  openVehicleDailog() {
    const dialog = this.matDialog.open(VehicleDialogComponent, {
      width: '20%',
      data: {
        action: 'Create',
      }
    });
    dialog.afterClosed().subscribe(data => {
      this.service.createVehicle(data.vehicle).subscribe((respone: any) => {
        console.log(data);
        this.vehicles.push(data.vehicle);
      }, (err => {
        this.matSnackBar.open(err.error.message, 'Dismiss', {
          duration: 3000
        });
      }));
    });
  }

  removeVehicle(event) {
    console.log(event.id);
    this.service.deleteVehicle(event.id).subscribe(data => {
      _.remove(this.vehicles, (item: VehicleModel) => {
        return item.id === event.id;
      });
      this.selectedVehcile = null;
    });
  }

  editVehicle(event) {
    this.service.editVehicle(event).subscribe(data => {
      this.selectedVehcile = event;
      this.vehicles.forEach(vehicle => {
        if (vehicle.id === event.id) {
          vehicle.name = event.name;
        }
      });
    });
  }

  private editSuccessfullConnectionTime(vehicle: VehicleModel) {
    vehicle.lastSuccessfulConnection = Date.now();
    return vehicle;
  }

}
