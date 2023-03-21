import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 8px;
      }
    `
  ]
})
export class HeroComponent implements OnInit {

  hero!: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({id}) => {
        this.heroesService.getHeroById(id)
          .subscribe(hero => this.hero = hero);
      });
  }

  toHome(): void {
    this.router.navigate(['/heroes/all'])
  }

}
