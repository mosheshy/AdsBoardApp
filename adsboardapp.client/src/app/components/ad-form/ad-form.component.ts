import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdService, Ad } from '../../services/ad.service';

declare var google: any;
declare global {
    interface Window {
        initMap?: () => void;
    }
}
@Component({
    selector: 'app-ad-form',
    templateUrl: './ad-form.component.html',
    styleUrls: ['./ad-form.component.css'],
})

export class AdFormComponent implements OnInit {
    mapCenter = { lat: 32.0853, lng: 34.7818 }; 
    map: google.maps.Map | undefined;
    mapElement: any;

    ad: Ad = {
        title: '',
        description: '',
        price: 0,
        category: '',
        location: { lat: 32.0853, lng: 34.7818 }, 
        createdBy: '',
        createdAt: '',
    };


    isEditMode: boolean = false;

       
    constructor(private adService: AdService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.mapElement = document.getElementById('map-container');
        (window as any).initMap = () => this.initializeMap();

        const adId = Number(this.route.snapshot.paramMap.get('id'));
        if (adId) {
            this.isEditMode = true;
            this.loadAd(adId)


        }
    };
    initializeMap(): void {
       

        if (this.mapElement) {
            const mapOptions = {
                center: this.ad.location,
                zoom: 12
            };

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            new google.maps.Marker({
                position: this.ad.location,
                map: this.map,
                title: 'Selected Location'
            });

            this.map?.addListener('click', (event: google.maps.MapMouseEvent) => {
                if (event.latLng) {
                    this.ad.location = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    };
                    console.log('Location updated:', this.ad.location);
                }
            });
        } else {
            console.error('Map container element not found');
        }
    }
   
    
    loadAd(id: number) {
        
            // Fetch the ad by ID
            this.adService.getAdById(id).subscribe(
                (ad) => (this.ad = ad),
                (error) => console.error('Error loading ad:', error)
            );
        
    }
    loadAdData(id: number): void {
        // Mock data for now, replace with service call to fetch ad by ID
        this.ad = {
            id,
            title: 'Sample Ad',
            description: 'This is a sample ad.',
            price: 100,
            category: 'Electronics',
            location: { lat: 32.0853, lng: 34.7818 },
            createdBy: 'Admin',
            createdAt: new Date().toISOString(),
        };
    }
    setLocation(event: google.maps.MapMouseEvent): void {
        if (event.latLng) {
            this.ad.location = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
        }
    }
    saveAd() {
        if (this.isEditMode) {
            this.adService.updateAd(this.ad.id!, this.ad).subscribe(
                (response) => {
                    alert('Ad updated successfully.');
                    this.router.navigate(['/ads', this.ad.id]); // Redirect to details page
                },
                (error) => {
                    if (error.status === 400 && error.error?.errors) {
                        console.error('Validation errors:', error.error.errors);                       
                    } else {
                        console.error('Error updating ad:', error);
                    }
                }
            );
        } else {
            console.log('Saving ad:', this.ad);
            this.adService.createAd(this.ad).subscribe(
                (response) => {

                    console.log('Ad saved successfully:', response);
                    this.router.navigate(['/ads', response.id]);
                },
                (error) => {
                    console.error('Error saving ad:', error);
                }
            );
        }
    }
}

