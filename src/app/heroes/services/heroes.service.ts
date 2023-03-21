import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes`);
  }

  getHeroById(heroId: string): Observable<Hero> {
    return this.http.get<Hero>(`${this._baseUrl}/heroes/${heroId}`);
  }

  getSuggestions(searchTerm: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes?q=${searchTerm}&_limit=6`);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this._baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this._baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(heroId: string): Observable<any>{
    return this.http.delete<any>(`${this._baseUrl}/heroes/${heroId}`);
  }
}
