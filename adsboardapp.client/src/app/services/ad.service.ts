import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';


export interface Location {
    lat: number;
    lng: number;
}

export interface Ad {
    id?: number; // Optional, matching `int?` in C#
    title: string;
    description: string;
    price?: number; // Optional, matching `int?` in C#
    category?: string; // Optional, matching `string?` in C#
    location?: Location; // Optional, matching `Location?` in C#
    createdBy?: string; // Optional, matching `string?` in C#
    createdAt?: string; // Optional, matching `string?` in C#
}

@Injectable({
    providedIn: 'root'
})
export class AdService {
    private apiUrl = `${environment.apiBaseUrl}/api/Ads`;
    
    constructor(private http: HttpClient) {
        
    }

    getAds(): Observable<Ad[]> {
        return this.http.get<Ad[]>(`${this.apiUrl}/Get`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('HTTP Error:', error);
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('Client-side error:', error.error.message);
        } else {
            // Server-side error
            console.error(`Server-side error: ${error.status} ${error.message}`);
        }
        return throwError('Something went wrong with the request. Please try again later.');
    }

    getAdById(id: number): Observable<Ad> {
        return this.http.get<Ad>(`${this.apiUrl}/Get/${id}`);
    }

    createAd(ad: Ad): Observable<Ad> {
        return this.http.post(`${this.apiUrl}/Post`, ad, { responseType: 'text' as 'json' }).pipe(
            map((response: any) => {
                // Convert plain text response to JSON object
                return JSON.parse(response);
            })
        );
    }

    updateAd(id: number, ad: Ad): Observable<Ad> {
        return this.http.put(`${this.apiUrl}/Put/${id}`, ad, { responseType: 'text' as 'json' }).pipe(
            map((response: any) => {
                // Convert plain text response to JSON object
                return JSON.parse(response);
            })
        );
    }

    /*
    createAd(ad: Ad): Observable<Ad> {
        return this.http.post<Ad>(`${this.apiUrl}/Post`, ad);
    }

    updateAd(id: number, ad: Ad): Observable<Ad> {
        return this.http.put<Ad>(`${this.apiUrl}/Put/${id}`, ad);
    }
    */
    deleteAd(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/Delete/${id}`);
    }
}
