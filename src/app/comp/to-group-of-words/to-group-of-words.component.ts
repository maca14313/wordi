import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { commonWords } from '../../data_array/words/english_words';
import { ApiServiceService } from '../../services/api-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-to-group-of-words',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './to-group-of-words.component.html',
  styleUrl: './to-group-of-words.component.css'
})
export class ToGroupOfWordsComponent {
  numberOfButtons: number = 0;

  constructor(private apiService:ApiServiceService) {
    // Calculate the number of buttons needed
    this.numberOfButtons = Math.ceil(commonWords.length / 10);
  }
}
