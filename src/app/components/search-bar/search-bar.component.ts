import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  HostListener,
  ElementRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SearchBarService } from '../../services/search-bar.service';
import { LocationData } from '../../models/data.types';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() set locationData(data: LocationData[]) {
    this.searchService.setLocationData(data);
  }

  @Output() selectedLocation = new EventEmitter<LocationData>();
  @ViewChild('searchBarWrapper') searchBarWrapper!: ElementRef;

  constructor(public searchService: SearchBarService) {}

  onSelect(loc: LocationData) {
    this.searchService.selectLocation(loc, (selected) => {
      this.selectedLocation.emit(selected);
    });
  }

  onEnterKey() {
    this.searchService.handleEnterKey((selected) => {
      this.selectedLocation.emit(selected);
    });
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (this.searchBarWrapper && !this.searchBarWrapper.nativeElement.contains(event.target)) {
      this.searchService.closeDropdown();
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.searchService.handleArrowNavigation('down');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.searchService.handleArrowNavigation('up');
        break;
      case 'Enter':
        event.preventDefault();
        this.onEnterKey();
        break;
    }
  }
}
