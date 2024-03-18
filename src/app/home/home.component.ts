import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from '../services/character.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent implements OnInit{
    title = 'Home';
    // http: HttpClient = inject(HttpClient);
    private characterService = inject(CharacterService);
    characters: any = [];

    ngOnInit(): void {
      this.loadCharacters();
    }

    // fetchCharacters() {
    //   this.http.get('https://rickandmortyapi.com/api/character')
    //   .subscribe((response: any) => {
    //     this.characters = response.results;
    //     console.log(this.characters);
    //   })
    // }

    // loadCharacters() {
    //   this.characterService.getCharacters()
    //   .subscribe((response: any) => {
    //     this.characters = response.results;
    //     console.log(this.characters);
    //   })
    // }

    loadCharacters() {
      this.characterService.getCharacters().subscribe({
        next: (response: any) => {
          this.characters = response.results;
          console.log('Posts fetched successfully!');
        }, 
        error: (error) => console.log('Error fetching posts: ', error)
      });
    }
  }