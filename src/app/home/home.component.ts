import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent implements OnInit{
    title = 'Home';
    http: HttpClient = inject(HttpClient);
    characters: any = [];

    ngOnInit(): void {
      this.fetchCharacters();
    }

    fetchCharacters() {
      this.http.get('https://rickandmortyapi.com/api/character')
      .subscribe((response: any) => {
        this.characters = response.results;
        console.log(this.characters);
      })
    }

  }