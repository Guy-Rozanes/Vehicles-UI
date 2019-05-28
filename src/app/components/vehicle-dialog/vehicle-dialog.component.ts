import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import VehicleModel from '../../models/vehicle/vehicle.model';
import dateFormat from 'dateformat';

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
  @ViewChild('dateConnection') dateConnection;

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.vehicle = this.data.vehicle ? this.data.vehicle : null;
    if (this.vehicle) {
      const date = this.epochToDate(this.vehicle.lastSuccessfulConnection);

      this.carName.nativeElement.value = this.vehicle.name;
      this.selected = this.vehicle.carType;
      this.createdTime = this.vehicle.timeCreated;
      this.dateConnection.nativeElement.value = date;
    }
  }

  closeDialog(picker) {
    let vehicle = {};
    if (this.data.action === 'Edit') {
      console.log();
      vehicle = {
        id: this.vehicle.id,
        name: this.carName.nativeElement.value,
        carType: this.selected,
        timeCreated: this.vehicle.timeCreated,
        lastSuccessfulConnection: this.convertToEpoch(this.dateConnection.nativeElement.value)
      }
      ;
    } else {
      vehicle = {
        name: this.carName.nativeElement.value,
        carType: this.selected,
        timeCreated: Date.now(),
        lastSuccessfulConnection: this.convertToEpoch(this.dateConnection.nativeElement.value)
      };
    }
    this.dialogRef.close(
      {
        action: this.data.action,
        vehicle
      });
  }

  private convertToEpoch(dateString: string): number {
    const array = dateString.split('/');
    const dateFormmated = `${+array[2]}-${+array[0]}-${+array[1]}`;

    const epochTime = Math.round(new Date(+array[2], +array[0], +array[1]).getTime() / 1000);
    return epochTime;
  }

  private epochToDate(epoch: number) {
    const epochDate = new Date(epoch * 1000);
    const date = dateFormat(epochDate.setMonth(epochDate.getMonth() - 1), 'mm/dd/yyyy');
  }


}
