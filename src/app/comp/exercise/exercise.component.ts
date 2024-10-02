import { Component, DoCheck, Input, OnInit, inject } from '@angular/core';
import { amharic_dictionary} from '../../data_array/dictionary/amharic_dictionary';
import { ApiServiceService } from '../../services/api-service.service';
import { filteredObjectWordType } from '../../types/crude';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Device } from '@capacitor/device';









@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule,FormsModule,ExerciseComponent,ButtonModule,TableModule,RouterLink],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);

  filteredWords:filteredObjectWordType[]=[]

  indexOfWords:number


  constructor(private apiService:ApiServiceService, @Inject(PLATFORM_ID) private platformId: any,private platform: Platform){

    this.indexOfWords = parseInt(this.route.snapshot.params['id'], 10);

      }

  ngOnInit() :void {
    this.fetchFilteredWords(this.indexOfWords)
  }

  fetchFilteredWords(batchIndex: number){
    this.filteredWords=this.apiService.getFilteredWords(batchIndex)
    }




/*
  speak(word: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-Speech not supported.');
    }
  } */

    speak(word:string) {
      if (isPlatformBrowser(this.platformId)) {
        import('@capacitor-community/text-to-speech').then(({ TextToSpeech }) => {
          TextToSpeech.speak({
            text: word,
            lang: 'en-US',
            rate: 1.0,
            pitch: 1.0,
            volume: 1.0,
          }).catch(error => {
            console.error('Error speaking text:', error);
          });
        }).catch(error => {
          console.error('Error loading TextToSpeech module:', error);
        });
      } else {
        console.log('Text-to-Speech is only available in the browser.');
      }
    }


}
