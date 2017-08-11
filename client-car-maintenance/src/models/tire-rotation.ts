import { Car } from './car';
export class TireRotation {
    id?: number;
    date ?: string;
    mileage ?: number;
    mileageNextDue?: number;
    cost?: number;
    notes?: string;
    CarId?: number;
    car?: Car;
}
