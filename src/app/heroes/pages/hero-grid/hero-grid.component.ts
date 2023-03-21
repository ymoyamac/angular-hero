import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-grid',
  templateUrl: './hero-grid.component.html',
  styles: [
  ]
})
export class HeroGridComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getAllHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }


}
