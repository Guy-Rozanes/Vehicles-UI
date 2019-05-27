import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import VehicleModel from '../../models/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent implements OnInit {

  private selected = 'SUV';
  private vehicle: VehicleModel;
  private createdTime: number;

  @ViewChild('carName') carName;

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.vehicle = this.data.vehicle ? this.data.vehicle : null;
    console.log(this.vehicle);
    if (this.vehicle) {
      this.carName.nativeElement.value = this.vehicle.name;
      this.selected = this.vehicle.carType;
      this.createdTime = this.vehicle.timeCreated;
    }
  }

  closeDialog(carName) {
    let vehicle = {};
    if (this.data.action === 'Edit') {
      vehicle = {
        id: this.vehicle.id,
        name: carName.value,
        carType: this.selected,
        timeCreated: this.vehicle.timeCreated,
        lastSuccessfulConnection: Date.now()
      };
    } else {
      vehicle = {
        name: carName.value,
        carType: this.selected,
        timeCreated: Date.now(),
        lastSuccessfulConnection: Date.now()
      };
    }
    this.dialogRef.close(
      {
        action: this.data.action,
        vehicle
      });

  }


}
