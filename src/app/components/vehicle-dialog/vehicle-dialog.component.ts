import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import VehicleModel from '../../models/vehicle/vehicle.model';
import dateFormat from 'dateformat';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent implements OnInit {

  private selected = 'SUV';
  private vehicle: VehicleModel;
  private createdTime: number;
  @ViewChild('dateConnection') dateConnection;
  carNameField = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.vehicle = this.data.vehicle ? this.data.vehicle : null;
    if (this.vehicle) {
      this.carNameField.setValue(this.vehicle.name);
      this.selected = this.vehicle.carType;
      this.createdTime = this.vehicle.timeCreated;
      this.dateConnection.nativeElement.value = this.epochToDate(this.vehicle.lastSuccessfulConnection);
    }
  }

  closeDialog() {
    let vehicle = {};
    if (this.data.action === 'Edit') {
      vehicle = {
        id: this.vehicle.id,
        name: this.carNameField.value,
        carType: this.selected,
        timeCreated: this.createdTime,
        lastSuccessfulConnection: this.convertToEpoch(this.dateConnection.nativeElement.value)
      }
      ;
    } else {
      const createTime: number = Date.now();
      vehicle = {
        name: this.carNameField.value,
        carType: this.selected,
        timeCreated: createTime / 1000,
        lastSuccessfulConnection: this.convertToEpoch(this.dateConnection.nativeElement.value)
      };
    }
    this.dialogRef.close(
      {
        action: this.data.action,
        vehicle
      });
  }

  private convertToEpoch(dateString: string) {
    const array = dateString.split('/');

    const epochTime = Math.round(new Date(+array[2], +array[0], +array[1]).getTime() / 1000);
    return epochTime;
  }

  private epochToDate(epoch: number) {
    const epochDate = new Date(epoch * 1000);
    return dateFormat(epochDate.setMonth(epochDate.getMonth() - 1), 'mm/dd/yyyy');

  }


}
