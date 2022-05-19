import {CategoryProps} from '../Category';

export interface FoodData {
  [x: string]: any;
  name: string;
  category: CategoryProps;
  date?: number;
  dateword?: string;
  keyword: string[];
  dday?: string;
}
