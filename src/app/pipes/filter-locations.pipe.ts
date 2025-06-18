import { Pipe, PipeTransform } from '@angular/core';
import { LocationData } from '../models/data.types';

@Pipe({
  name: 'filterLocations',
  standalone: true
})
export class FilterLocationsPipe implements PipeTransform {

  transform(value: LocationData[], query: string, maxResults: number = 10): LocationData[] {
    if (!query) return [];

    const queryLower = query.toLowerCase();

    return value.filter(loc => {
      const words = loc.name.toLowerCase().split(/\s+/); // split by whitespace
      return words.some(word => word.startsWith(queryLower));
    }).slice(0, maxResults);
  }
}
