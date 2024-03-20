import { Component, OnInit, inject } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { CharacterDetails } from '../interfaces/character-details';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent implements OnInit{
    title = 'Home';
    private characterService = inject(CharacterService);
    characters: CharacterDetails[] = [];

    ngOnInit(): void {
      this.loadCharacters();
    }

    loadCharacters() {
      this.characterService.getCharacters().subscribe({
        next: (response: any) => {
          this.characters = response.results as CharacterDetails[];
        }, 
        error: (error) => console.log('Error fetching posts: ', error)
      });
    }
  }