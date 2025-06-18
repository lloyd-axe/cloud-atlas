import { Injectable, signal, computed } from '@angular/core';
import { LocationData } from '../models/data.types';
import { FilterLocationsPipe } from '../pipes/filter-locations.pipe';

@Injectable({ providedIn: 'root' })
export class SearchBarService {
  query = signal('');
  isDropdownOpen = signal(false);
  selectedIndex = signal(-1);
  locationData: LocationData[] = [];

  private filterPipe = new FilterLocationsPipe();

  filteredResults = computed(() =>
    this.filterPipe.transform(this.locationData, this.query())
  );

  setLocationData(data: LocationData[]) {
    this.locationData = data;
  }

  selectLocation(loc: LocationData, onSelectCallback: (loc: LocationData) => void) {
    this.query.set(loc.name);
    this.isDropdownOpen.set(false);
    this.selectedIndex.set(-1);
    onSelectCallback(loc);
  }

  handleFocus() {
    if (this.query().trim().length > 0) {
      this.isDropdownOpen.set(true);
    }
  }

  handleInput() {
    if (this.query().trim().length > 0) {
      this.isDropdownOpen.set(true);
      this.selectedIndex.set(-1);
    } else {
      this.isDropdownOpen.set(false);
    }
  }

  handleEnterKey(onSelectCallback: (loc: LocationData) => void) {
    const results = this.filteredResults();
    const index = this.selectedIndex();
    if (results.length > 0) {
      if (index >= 0) {
        this.selectLocation(results[index], onSelectCallback);
      } else {
        this.selectLocation(results[0], onSelectCallback);
      }
    }
  }

  handleArrowNavigation(direction: 'up' | 'down') {
    const results = this.filteredResults();
    if (!this.isDropdownOpen() || results.length === 0) return;

    const currentIndex = this.selectedIndex();
    let newIndex = currentIndex;

    if (direction === 'down') {
      newIndex = currentIndex + 1 >= results.length ? 0 : currentIndex + 1;
    }

    if (direction === 'up') {
      newIndex = currentIndex - 1 < 0 ? results.length - 1 : currentIndex - 1;
    }

    this.selectedIndex.set(newIndex);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
    this.selectedIndex.set(-1);
  }
}
