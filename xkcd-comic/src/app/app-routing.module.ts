import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicComponent } from './comic/comic.component';

const routes: Routes = [
  {path: 'comic', component: ComicComponent},
  {path: '', component: ComicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
