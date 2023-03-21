import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 8px;
      }
    `
  ]
})
export class AddHeroComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    alt_img: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('update')) return;
    this.activatedRoute.params
      .pipe(switchMap(({id}) => this.heroesService.getHeroById(id)))
      .subscribe(hero => this.hero = hero);
  }

  createHero(): void {
    if (this.hero.superhero.trim().length === 0) return;
    if (!this.hero.id) {
      this.heroesService.createHero(this.hero)
        .subscribe(hero => {
          this.hero = hero;
          this.router.navigate(['/heroes/all']);
          this.notify(`Hero: ${hero.superhero} has been created successfully`);
        });
    } else {
      this.heroesService.updateHero(this.hero)
        .subscribe(hero => {
          this.router.navigate(['/heroes/all']);
          this.notify(`Hero: ${hero.superhero} has been updated successfully`);
        });
    }
  }

  deleteHero(): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '20%',
      data: { ...this.hero },
    });
    dialog.afterClosed()
      .subscribe(resp => {
        if (resp) {
          this.heroesService.deleteHero(this.hero.id!)
            .subscribe(hero => this.router.navigate(['/heroes/all']));
        }
      })
  }

  notify(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

}
