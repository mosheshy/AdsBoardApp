import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdService, Ad } from '../../services/ad.service';

@Component({
    selector: 'app-ad-details',
    templateUrl: './ad-details.component.html',
    styleUrls: ['./ad-details.component.css'], // Add a style file if needed
})
export class AdDetailsComponent implements OnInit {
    ad?: Ad;
    adId?: number;

    // Simulate a logged-in user
    currentUser = 'user123';

    constructor(
        private route: ActivatedRoute,
        private adService: AdService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Get the ad ID from the route parameters
        this.route.params.subscribe((params) => {
            this.adId = +params['id'];
            this.loadAd();
        });
    }

    loadAd() {
        if (this.adId) {
            // Fetch the ad by ID
            this.adService.getAdById(this.adId).subscribe(
                (ad) => (this.ad = ad),
                (error) => console.error('Error loading ad:', error)
            );
        }
    }

    editAd() {
        if (this.adId) {
            
            this.router.navigate(['/ads/edit', this.adId]);
        }
    }

    deleteAd() {
        if (this.adId && confirm('Are you sure you want to delete this ad?')) {
            this.adService.deleteAd(this.adId).subscribe(
                () => {
                    alert('Ad deleted successfully.');
                    this.router.navigate(['/']); 
                },
                (error) => {
                    console.error('Error deleting ad:', error);
                }
            );
        }
    }

    canEditOrDelete(): boolean {
      
        return  true //this.ad?.createdBy === this.currentUser;
    }
}
