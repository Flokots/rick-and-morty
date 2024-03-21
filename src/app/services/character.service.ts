import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CharacterDetails, Info } from '../interfaces/character-details';
import { Observable } from 'rxjs';

const BASE_URL = 'https://rickandmortyapi.com/api/character';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getCharacter(id: number) : Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${BASE_URL}/${id}`);
  }

  getCharacters(page: number) : Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${BASE_URL}?page=${page}`);
  }
  
}
