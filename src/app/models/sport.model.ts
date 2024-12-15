import { SportCategory } from './enum/sport-category';
import { SportName } from './enum/sport-name';

export interface Sport {
  category: SportCategory;
  name: SportName;
}
