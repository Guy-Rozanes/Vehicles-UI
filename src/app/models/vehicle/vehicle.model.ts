import {CarType} from './car-type.model';

export default interface VehicleModel {
  id: string;
  name: string;
  timeCreated: number;
  carType: CarType;
  lastSuccessfulConnection: number;
}
