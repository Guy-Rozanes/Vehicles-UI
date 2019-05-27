import {Component, Input, OnInit} from '@angular/core';
import VehicleModel from '../../models/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  @Input() vehicle: VehicleModel;

  constructor() {
  }

  ngOnInit() {
  }

}
