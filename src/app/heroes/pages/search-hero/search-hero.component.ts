import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styles: [
  ]
})
export class SearchHeroComponent {

  searchTerm: string = '';
  heroes: Hero[] = [];
  heroSelected: Hero | undefined;

  constructor(private heroesService: HeroesService) {}

  searchingHero(): void {
    this.heroesService.getSuggestions(this.searchTerm)
      .subscribe(heroes => this.heroes = heroes);
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const hero: Hero = event.option.value;

    if (!hero) {
      this.heroSelected = undefined;
      return;
    }

    this.searchTerm = hero.superhero;
    this.heroesService.getHeroById(hero.id!)
      .subscribe(hero => this.heroSelected = hero);
  }
}
