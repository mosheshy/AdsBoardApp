import { Component, OnInit } from '@angular/core';
import { AdService, Ad } from '../../services/ad.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ad-list',
    templateUrl: './ad-list.component.html',
    styleUrls: ['./ad-list.component.css']
})

export class AdListComponent implements OnInit {
    ads: Ad[] = [];
    filteredAds: Ad[] = [];
    searchQuery: string = '';
    minPrice: number = 0;
    maxPrice: number = 100000;
    selectedCategory: string = '';
    categories: string[] = ['Electronics', 'Furniture', 'Cars', 'Jobs'];
    loading: boolean = false;
    userLocation: any;
    constructor(private adService: AdService, private router: Router) { }

    ngOnInit(): void {
        this.loadAds();
    }

    loadAds() {
        this.loading = true;
        this.adService.getAds().subscribe(
            (data) => {
                console.log('Ads:', data); // Log to verify the response
                this.ads = data;
                this.applyFilter();
                this.loading = false;
            },
            (error) => {
                console.error('Error fetching ads:', error);
                this.loading = false;
            }
        );
    }
    applyFilter() {
        this.filteredAds = this.ads;
        const range: number = 20.0;
        // Filter by search query
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            this.filteredAds = this.filteredAds.filter(ad =>
                ad.title.toLowerCase().includes(query) ||
                ad.description?.toLowerCase().includes(query)
            );
        }

        // Filter by price range
        if (this.minPrice !== null) {
            this.filteredAds = this.filteredAds.filter(ad => ad.price !== undefined && ad.price >= this.minPrice);
        }
        if (this.maxPrice !== null) {
            this.filteredAds = this.filteredAds.filter(ad => ad.price !== undefined && ad.price <= this.maxPrice);
        }

        // Filter by category
        if (this.selectedCategory) {
            this.filteredAds = this.filteredAds.filter(ad => ad.category === this.selectedCategory);
        }

        // Filter by location (if user location is available)
        if (this.userLocation) {
            this.filteredAds = this.filteredAds.filter(ad => {
                if (ad.location?.lat && ad.location?.lng) {
                    const adLocation = { lat: ad.location.lat, lng: ad.location.lng };
                    return this.isWithinRange(adLocation, range); // Return true or false based on range
                }
                return false; // Exclude ads without a location
            });
        }
    }


    isWithinRange(adLocation: { lat: number ; lng: number  }, range: number): boolean {
        if (!this.userLocation || !adLocation) {
            return false;
        }

        const distance = this.calculateDistance(
            this.userLocation.lat,
            this.userLocation.lng,
            adLocation.lat,
            adLocation.lng
        );

        return distance <= range;
    }
    calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const toRad = (value: number) => (value * Math.PI) / 180;
        const earthRadius = 6371; 

        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c; 
    }

    filterByCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    this.applyFilter();
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    alert('Unable to fetch your location. Please enable location services.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }

   
  
    onSearchChange() {
        this.applyFilter();
    }

    goToDetails(id: number) {
        this.router.navigate(['/ads', id]);
    }

    createNewAd() {
        this.router.navigate(['/ads/new']);
    }
}
