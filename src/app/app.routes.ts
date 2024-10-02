import { Routes } from '@angular/router';
import { ExerciseComponent } from './comp/exercise/exercise.component';
import { HomeComponent } from './comp/home/home.component';
import { PracticeComponent } from './comp/practice/practice.component';
import { ToGroupOfWordsComponent } from './comp/to-group-of-words/to-group-of-words.component';
import { CheckYourWordsComponent } from './comp/check-your-words/check-your-words.component';
import { ToDoComponent } from './comp/to-do/to-do.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'exercise/:id',
    component:ExerciseComponent,
    title: 'Exercise',
  },

  {
    path: 'practice/:word/:amh/:group',
    component:PracticeComponent,
    title: 'Practice',
  },

  {
    path: 'togroupofwords',
    component:ToGroupOfWordsComponent,
    title: 'To Group Of Words',
  },

  {
    path: 'checkyourwords',
    component:CheckYourWordsComponent,
    title: 'Check Your Words',
  },

  {
    path: 'todo',
    component:ToDoComponent,
    title: 'To Do',
  },


];
