import { Component, OnInit, inject } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterDetails, Info } from '../../interfaces/character-details';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title = 'Home';

  info: Info;
  characters: CharacterDetails[] = [];
  searchCharacters: CharacterDetails[] = [];
  
  searchString: string;
  errorMessage: string;
  currentPage: number = 1;
  totalPages: number = 0; 

  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private characterService = inject(CharacterService);

  ngOnInit(): void {
    this.loadPaginatedCharacters();
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
        this.totalPages = this.info.pages;
      },
      error: (error) => {
        console.log('Error fetching characters: ', error);
        this.characters = [];
      },
    });
  }

  loadPaginatedCharacters() {
    this.characterService.getPaginatedCharacters(this.currentPage).subscribe({
      next: (response: any) => {
        this.characters = response.results as CharacterDetails[];
        this.info = response.info as Info;
        this.totalPages = this.info.pages;
      },
      error: (error) => {
        console.log('Error fetching characters: ', error);
        this.characters = [];
      },
    })
  }

  loadSearchCharacters() {
    this.characterService.getSearchCharacter(this.searchString).subscribe({
      next: (response: any) => {
        this.characters = response.results as CharacterDetails[];
        this.info = response.info as Info;
        this.totalPages = this.info.pages;
      },
      error: (error) => {
        this.errorMessage = error.error.error;
        this.characters = [];
        console.log('Error fetching character details: ', error);
      }

    });
  }

  onSearchClicked(value: string) {
    this.router.navigate(['/home'], { queryParams: { search: value } })
  }

  firstPage() {
    this.currentPage = 1;
    this.loadPaginatedCharacters();
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.loadPaginatedCharacters();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPaginatedCharacters();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPaginatedCharacters()
    }
  }
}
