import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const BASE_URL = 'https://rickandmortyapi.com/api/character';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }
  getCharacters() {
    return this.http.get(BASE_URL);
  }
}
