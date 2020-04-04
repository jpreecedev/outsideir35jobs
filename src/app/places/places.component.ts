import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
})
export class PlacesComponent implements OnInit, AfterViewInit {
  @Input() addressType: string;
  @Input() id: string;
  @Input() name: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    if (!google) {
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        types: [this.addressType],
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: object) {
    this.setAddress.emit(place);
  }
}
