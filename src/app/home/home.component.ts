import { Component, OnInit, inject } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { CharacterDetails, Info } from '../interfaces/character-details';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title = 'Home';
  characters: CharacterDetails[] = [];
  searchCharacters: CharacterDetails[] = [];
  info: Info;
  searchString: string;
  router: Router = inject(Router);
  errorMessage: string;

  private characterService = inject(CharacterService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadCharacters();
    // this.searchString = this.activeRoute.snapshot.queryParams['search'];
    this.activeRoute.queryParams.subscribe((data) => {
      this.searchString = data['search'];

      if (this.searchString === undefined || this.searchString === '' || this.searchString === null) {
        this.loadCharacters();
      } else {
        this.loadSearchCharacters();
      }
    })
  }

  loadCharacters() {
    this.characterService.getCharacters().subscribe({
      next: (response: any) => {
        this.characters = response.results as CharacterDetails[];
        this.info = response.info as Info;
      },
      error: (error) => {
        console.log('Error fetching characters: ', error);
        this.characters = [];
      },
    });
  }

  loadSearchCharacters() {
    this.characterService.getSearchCharacter(this.searchString).subscribe({
      next: (response: any) => {
        this.characters = response.results as CharacterDetails[];
        this.info = response.info as Info;
      },
      error: (error) => {
        this.errorMessage = error.error.error;
        this.characters = [];
        console.log('Error fetching character details: ', error);
      }
      
    });
  }

  onSearchClicked(value: string) {
    this.router.navigate(['/home'], {queryParams: {search: value}})
  }
}
