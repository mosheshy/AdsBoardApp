import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdFormComponent } from './components/ad-form/ad-form.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';

const routes: Routes = [
    { path: '', component: AdListComponent },
    { path: 'ads/new', component: AdFormComponent },
    { path: 'ads/edit/:id', component: AdFormComponent },
    { path: 'ads/:id', component: AdDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
