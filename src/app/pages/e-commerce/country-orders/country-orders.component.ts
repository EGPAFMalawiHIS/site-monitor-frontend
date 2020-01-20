import { Component, OnDestroy,OnInit } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/data/country-order';
import {SocketService} from '../../../services/socket.service'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-country-orders',
  styleUrls: ['./country-orders.component.scss'],
  template: `
   
      <agm-map
      [latitude]="-13.2512161"
      [longitude]="34.3015278"
      [zoom]="7"
      (mapClick)="addMarker($event.coords.lat, $event.coords.lng)"
    >
      <agm-marker
        *ngFor="let marker of markers"
        [latitude]="marker.lat"
        [longitude]="marker.lng"
        [opacity]="marker.alpha"
        [markerDraggable]="true"
        title="{{marker.name}}"
        iconUrl="{{marker.color}}"
        (markerClick)="selectMarker($event)"
      >
      </agm-marker>
      
    </agm-map>
    <p *ngIf="selectedMarker">
      Lat: {{ selectedMarker.lat }} Lng: {{ selectedMarker.lng }}
    </p>        
      
  `,
})
export class CountryOrdersComponent implements OnDestroy {

  lng = 34.3015278;
  lat = -13.2512161;

  selectedMarker;
  markers = [];

  private alive = true;

  countryName = '';
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;
 message: string;
  messages: any = [];

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private countryOrderService: CountryOrderData,
              private socket:SocketService) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService.getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });

     
  }

  ngOnInit() {
    this.socket
      .getMessages()
      .subscribe((message: string) => {
        if(message != '')
        {
          this.messages = JSON.parse(message);
          this.markers = [];

          for (var i = 0; i < this.messages.length ; i++) {
            // code...
            console.log(this.messages);
            this.markers.push({ 
              lng: this.messages[i].longitude, 
              lat: this.messages[i].latitude, 
              alpha: 1,
              color: this.getColor(this.messages[i].status),
              name: this.messages[i].site });
          }
        }
      });
    
  }
  
  getColor(status){
    if(status == 1){
      return 'http://10.150.72.20/maps.google.com/mapfiles/ms/icons/green-dot.png';
    }
    else
    {
      return '';
    }
  }

  selectCountryById(countryName: string) {
    this.countryName = countryName;

    this.countryOrderService.getCountriesCategoriesData(countryName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((countryData) => {
        this.countryData = countryData;
      });
  }


addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }
 

  ngOnDestroy() {
    this.alive = false;
  }
}
