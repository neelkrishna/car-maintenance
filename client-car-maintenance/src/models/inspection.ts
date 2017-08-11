import { Car } from './car';
export class Inspection {
    id?: number;
    date ?: string;
    mileage ?: number;
    dateNextDue?: string;
    cost?: number;
    notes?: string;
    CarId?: number;
    car?: Car;
}
