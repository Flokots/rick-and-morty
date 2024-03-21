import { HttpClient} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CharacterDetails } from '../interfaces/character-details';
import { Observable } from 'rxjs';

const BASE_URL = 'https://rickandmortyapi.com/api/character/';
const PAGE_URL = 'https://rickandmortyapi.com/api/character/?page='
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name='
@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getCharacter(id: number): Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${BASE_URL}/${id}`);
  }

  getCharacters(): Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${BASE_URL}`);
  }

  getSearchCharacter(name: string): Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${SEARCH_URL}${name}`);
  }

  getPaginatedCharacters(page: number): Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${PAGE_URL}${page}`);
  }

}
