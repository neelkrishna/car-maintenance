import { Car } from './car';
export class OilChange {
    id?: number;
    date ?: string;
    mileage ?: number;
    mileageNextDue?: number;
    cost?: number;
    notes?: string;
    CarId?: number;
    car?: Car;
}
