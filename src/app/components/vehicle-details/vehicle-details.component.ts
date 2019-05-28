import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import VehicleModel from '../../models/vehicle/vehicle.model';
import {ServerService} from '../../services/server.service';
import {MatDialog} from '@angular/material';
import {VehicleDialogComponent} from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  constructor(private service: ServerService,
              public matDialog: MatDialog) {
  }

  vehicleTypes: string[] = ['Created Time', 'Car Type', 'last connection'];
  @Input() vehicle: VehicleModel;
  @Output() vehicleEmitter = new EventEmitter<VehicleModel>();
  @Output() editEmitter = new EventEmitter<VehicleModel>();

  ngOnInit() {
    console.log(this.vehicle.lastSuccessfulConnection);
  }

  removeVehicle(vehicle: VehicleModel) {
    this.vehicleEmitter.emit(vehicle);
  }

  editVehicle() {
    const dialog = this.matDialog.open(VehicleDialogComponent,
      {
        width: '20%',
        data: {
          action: 'Edit',
          vehicle: this.vehicle
        }
      });
    dialog.afterClosed().subscribe(data => {
      this.editEmitter.emit(data.vehicle);
    });
  }


}
