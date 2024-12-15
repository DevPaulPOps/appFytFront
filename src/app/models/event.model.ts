// event.model.ts
import { Sport } from './sport.model';

export interface Event {
  _id?: string;
  location: Location;
  organizer?: string;
  sport: Sport;
  date: Date;
  description: string;
}

export interface Location {
  type: string;
  coordinates: number[];
  address?: string;
}
