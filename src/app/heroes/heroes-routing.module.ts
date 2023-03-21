import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroGridComponent } from './pages/hero-grid/hero-grid.component';
import { AddHeroComponent } from './pages/add-hero/add-hero.component';
import { SearchHeroComponent } from './pages/search-hero/search-hero.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'all',
        component: HeroGridComponent,
      },
      {
        path: 'search',
        component: SearchHeroComponent,
      },
      {
        path: 'add',
        component: AddHeroComponent,
      },
      {
        path: 'hero/:id',
        component: HeroComponent,
      },
      {
        path: 'hero/update/:id',
        component: AddHeroComponent,
      },
      {
        path: '**',
        redirectTo: ''
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
