import {CategoryProps} from '../Category';

export interface FoodData {
  [x: string]: any;
  name: string;
  category: CategoryProps;
  date?: number;
  dateword?: string;
  keyword: string[];
  dday?: string;
  onlyMe?: boolean;
  memo?: string;
}

export interface FoodOutputData {
  no: number;
  name: string;
  category: CategoryProps;
  keyword: string[];
  dday: string;
  onlyMe: boolean;
  consumed: boolean;
  createdAt: string;
}
