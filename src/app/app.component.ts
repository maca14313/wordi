import { Component, DoCheck, Input, OnInit, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { ExerciseComponent } from './comp/exercise/exercise.component';
import { ThemeService } from './services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { ApiServiceService } from './services/api-service.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { filteredObjectWordType } from './types/crude';

import { App } from '@capacitor/app';
import { Platform } from '@angular/cdk/platform';

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

import { Device } from '@capacitor/device';

import { Location } from '@angular/common';







@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,ExerciseComponent,MatIconModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   {

  title = 'angular-tailwind-dark-mode';


  private themeService = inject(ThemeService);
  private apiServiceService=inject(ApiServiceService)

  searchWordObjects:filteredObjectWordType[]=[]
  isSearching:number=0
  isSearchingInfo:number=0
  theChoosenWord:string=''
  theChoosenAMH:string=''
  theChoosenEN:string=''



  constructor(private location: Location, private platform: Platform,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId) && this.platform.ANDROID) {
      App.addListener('backButton', () => {
        if (this.location.isCurrentPathEqualTo('/')) {
          if (confirm('Do you want to exit the app?')) {
            App.exitApp();
          }
        } else {
          this.location.back();
        }
      });
    }
  }

   searchWordForm = new FormGroup({
    word: new FormControl(''),
  });





  searchingWord(){
    this.isSearching=1
    this.isSearchingInfo=0
    const searchedWord=this.searchWordForm.value.word ?? ''
    console.log(searchedWord)
    const resWord= this.apiServiceService.searchWord(searchedWord)
    this.searchWordObjects=resWord
    console.log(this.searchWordObjects)

  }

  choosenWord(word:string,AMH:string,EN:string){
    this.isSearching=2
    this.isSearchingInfo=1
    this.theChoosenWord=word
    this.theChoosenAMH=AMH
    this.theChoosenEN=EN

  }

 /* speak() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.theChoosenWord);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-Speech not supported.');
    }
  } */






    speak() {
      if (isPlatformBrowser(this.platformId)) {
        import('@capacitor-community/text-to-speech').then(({ TextToSpeech }) => {
          TextToSpeech.speak({
            text: this.theChoosenWord,
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




  closeSearchWord(){
    this.isSearching=0
    this.isSearchingInfo=0
  }

 /* toggleDarkMode() {
    this.themeService.toggleDarkMode();
  } */

}
