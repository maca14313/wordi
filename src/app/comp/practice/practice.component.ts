import { Component, AfterViewInit,OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';
import { filteredObjectWordType } from '../../types/crude';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Device } from '@capacitor/device';




@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent implements OnInit,AfterViewInit {



  route: ActivatedRoute = inject(ActivatedRoute);
  wordToCheckId:string=''
  amhToCheckId:string=''
  indexOfWords:number
  isCorrect:number = 0;
  filteredWords:filteredObjectWordType[]=[]




  constructor(private apiService:ApiServiceService, @Inject(PLATFORM_ID) private platformId: any,private platform: Platform){
  this.wordToCheckId = this.route.snapshot.params['word'];
  this.amhToCheckId = this.route.snapshot.params['amh'];
  this.indexOfWords = parseInt(this.route.snapshot.params['group'], 10);


    }

    ngAfterViewInit() {
    }

    ngOnInit(){
      //this.fetchFilteredWords(this.indexOfWords)
    }

    checkWordForm = new FormGroup({
      word: new FormControl(''),
    });


      fetchFilteredWords(batchIndex: number){

      this.filteredWords=this.apiService.getFilteredWords(batchIndex)
      console.log(this.filteredWords)
      const newWord=this.filteredWords[Math.floor(Math.random() * this.filteredWords.length)]

      this.wordToCheckId=newWord.word
      this.amhToCheckId=newWord.AMH
console.log(this.wordToCheckId)
console.log(this.amhToCheckId)
      }



      changeWord(){
        this.checkWordForm.reset()
        this.isCorrect=0
        this.fetchFilteredWords(this.indexOfWords)
        }


 /* speak(word: string) {
    console.log(word)
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
