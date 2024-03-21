import { Component, OnInit, inject } from '@angular/core';
import { CharacterDetails } from '../interfaces/character-details';
import { CharacterService } from '../services/character.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  selectedCharacter: CharacterDetails;
  characterId: number = 0;
  characterService: CharacterService = inject(CharacterService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.characterId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.loadCharacter()

  }

  loadCharacter() {
    this.characterService.getCharacter(this.characterId).subscribe({
      next: (response: any) => {
        this.selectedCharacter = response as CharacterDetails;
      },
      error: (error) => console.log('Error fetching character details: ', error)
    });
  }

}
