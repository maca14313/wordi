import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { commonWords } from '../data_array/words/english_words';
import { amharic_dictionary } from '../data_array/dictionary/amharic_dictionary';
import { filteredObjectWordType } from '../types/crude';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
   apiUrl:string='http://localhost:7000/';
  constructor(private http:HttpClient) { }

  filteredObjects:filteredObjectWordType[]=[]
  searchWordObjects:filteredObjectWordType[]=[]



  searchWord(word: string) {
    console.log('Search word:', word); // Debug: Check the input word
    if (!word) {
      console.log('Empty search term, returning empty array'); // Debug: Empty search term
      this.searchWordObjects = [];
      return this.searchWordObjects;
    }

    const wordsToFind = word.toLowerCase();
    this.searchWordObjects = amharic_dictionary
      .filter(entry => entry._id.toLowerCase().startsWith(wordsToFind))
      .map((m, i: number) => ({
        _id: i,
        word: m._id,
        EN: m.EN,
        AMH: m.AMH
      }));

    console.log('Filtered objects:', this.searchWordObjects); // Debug: Check the filtered objects
    return this.searchWordObjects;
  }

  getAllWords(){

    const wordsToFind = commonWords.map(item => item.word.toLowerCase());
    const matchedDictionaryEntries = amharic_dictionary.filter(entry => wordsToFind.includes(entry._id.toLowerCase()));
    const randomNumber=Math.floor(Math.random() * matchedDictionaryEntries.length)
    const result = matchedDictionaryEntries.map((m,i) => ({
      _id:i,
      word: m._id,
      EN: m.EN,
      AMH: m.AMH
    }));
    return result[randomNumber]
  }

  getFilteredWords(batchIndex: number){
    const startIndex = batchIndex * 10;
    const endIndex = startIndex + 10;

    const filteredData=commonWords.filter(obj => obj._id >= startIndex && obj._id <= endIndex);
    const wordsToFind = filteredData.map(item => item.word.toLowerCase());
    const matchedDictionaryEntries = amharic_dictionary.filter(entry => wordsToFind.includes(entry._id.toLowerCase()));
    const result = matchedDictionaryEntries.map((m,i) => ({
      _id:i,
      word: m._id,
      EN: m.EN,
      AMH: m.AMH
    }));
    return  this.filteredObjects=result
  }



   createTaskApi(obj:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'createtask',obj)
   }

   updateTaskApi(title:any,id:number):Observable<any>{
    console.log(title,id)
    return this.http.post<any>(this.apiUrl + 'updatetask',{title:title,id:id})
   }

   deleteTaskApi(id:number):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'deletetaks',{ id: id })
   }

  getTaskApi():Observable<any>{
     return this.http.get<any>(this.apiUrl + 'alltasks' )
   }

}
