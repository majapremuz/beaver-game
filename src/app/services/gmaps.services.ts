import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GmapsService {
  private map: any;
  private markers: any[] = [];

  constructor() {}

  // Load Google Maps SDK
  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if (gModule && gModule.maps) {
      return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.google_map_api;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not available');
        }
      };
    });
  }

  // Initialize the map
  initializeMap(mapElement: HTMLElement, lat: number, lng: number) {
    const mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(mapElement, mapOptions);
  }
}
