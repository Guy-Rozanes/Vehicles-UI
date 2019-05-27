import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VehiclesComponent} from './containers/vehicles/vehicles.component';
import {HttpClientModule} from '@angular/common/http';
import {VehicleComponent} from './components/vehicle/vehicle.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule, MatFormField, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatOptionModule,
  MatRippleModule, MatSelectModule, MatSnackBar, MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VehicleDetailsComponent} from './components/vehicle-details/vehicle-details.component';
import {VehicleDialogComponent} from './components/vehicle-dialog/vehicle-dialog.component';


const angularMaterialModules = [
  MatRippleModule,
  BrowserAnimationsModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    VehicleComponent,
    VehicleDetailsComponent,
    VehicleDialogComponent
  ],
  imports: [
    ...angularMaterialModules,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [VehicleDialogComponent]
})
export class AppModule {
}
