import { Component, OnInit, inject } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { CharacterDetails, Info } from '../interfaces/character-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'Home';
  private characterService = inject(CharacterService);
  characters: CharacterDetails[] = [];
  info: Info;
  currentPage: number = 1;

  ngOnInit(): void {
    this.loadCharacters(this.currentPage);
  }

  loadCharacters(page: number) {
    this.characterService.getCharacters(this.currentPage).subscribe({
      next: (response: any) => {
        this.characters = response.results as CharacterDetails[];
        this.info = response.info as Info;
      },
      error: (error) => console.log('Error fetching characters: ', error)
    });
  }

}