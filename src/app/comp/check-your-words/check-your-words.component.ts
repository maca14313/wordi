import { Component, AfterViewInit,OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Device } from '@capacitor/device';






@Component({
  selector: 'app-check-your-words',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './check-your-words.component.html',
  styleUrl: './check-your-words.component.css'
})
export class CheckYourWordsComponent {
  wordToCheckId:string=''
  amhToCheckId:string=''
  isCorrect:number = 0;


  checkWordForm = new FormGroup({
    word: new FormControl(''),
  });

  constructor(private apiService:ApiServiceService, @Inject(PLATFORM_ID) private platformId: any,private platform: Platform){
  const choosenWord=this.apiService.getAllWords()
  this.wordToCheckId = choosenWord.word;
  this.amhToCheckId = choosenWord.AMH;

   console.log(choosenWord.word)

    }

  changeWord(){
  this.checkWordForm.reset()
  this.isCorrect=0
  const choosenWord=this.apiService.getAllWords()
  this.wordToCheckId = choosenWord.word;
  this.amhToCheckId = choosenWord.AMH;
  }

  /*speak(word: string) {

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-Speech not supported.');
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

  checkWord(){

    const checkedWord=this.checkWordForm.value.word ?? ''
    if(this.wordToCheckId.toLowerCase()==checkedWord.toLowerCase()){
      this.isCorrect=1
    }else{
      this.isCorrect=2
    }

   }


}
