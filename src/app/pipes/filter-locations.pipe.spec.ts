import { FilterLocationsPipe } from './filter-locations.pipe';
import { LocationData } from '../models/data.types';

describe('FilterLocationsPipe', () => {
  let pipe: FilterLocationsPipe;
  let testLocations: LocationData[];

  beforeEach(() => {
    pipe = new FilterLocationsPipe();
    testLocations = [
      { name: 'Ang Mo Kio', latitude: 1.3691, longitude: 103.8454, weather: 'Cloudy' },
      { name: 'Bedok', latitude: 1.3236, longitude: 103.9273, weather: 'Fair' },
      { name: 'Clementi', latitude: 1.3162, longitude: 103.7649, weather: 'Rain' }
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter locations by query', () => {
    const result = pipe.transform(testLocations, 'ang');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Ang Mo Kio');
  });

  it('should return empty array for no matches', () => {
    const result = pipe.transform(testLocations, 'xyz');
    expect(result.length).toBe(0);
  });

  it('should return empty array for empty query', () => {
    const result = pipe.transform(testLocations, '');
    expect(result.length).toBe(0);
  });

  it('should limit results to maxResults', () => {
    testLocations.push(
      { name: 'Ang Mo Kio North', latitude: 1.3701, longitude: 103.8464, weather: 'Cloudy' },
      { name: 'Ang Mo Kio South', latitude: 1.3681, longitude: 103.8444, weather: 'Cloudy' }
    );

    const result = pipe.transform(testLocations, 'ang', 2);
    expect(result.length).toBe(2);
  });
});
