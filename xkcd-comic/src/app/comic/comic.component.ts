import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

export class Comic {
  constructor(
    public num: number,
    public img: string,
    public title: string
  ) { 
  }
}

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

  showSpinner = false;
  private history: number[] = [];
  public comic: Comic;

  constructor(private httpClient: HttpClient) {
    this.comic = new Comic(5, "", "")
   }

  ngOnInit(): void {
    this.getComics();
  }

  buildUrl(number: Number): string {

    return `https://xkcd.com/${number}/info.0.json`
  }

  
 
  getComics() {
    this.showSpinner = true;
    const buildnewUrl = this.buildUrl(Math.floor((Math.random() * 1000) + 1));
    this.history.push(this.comic.num)
    this.httpClient.get<any>(buildnewUrl).subscribe(
      response => {
        console.log(response); 
        this.comic = new Comic(response.num, response.img, response.title)
        this.showSpinner = false;
        console.info(this.history)
        
        
      }
    );
  }
  getPreviousComic() {
    const pop = this.history.pop()?.toString();
    this.showSpinner = true;
    const prevUrl: string = "https://xkcd.com/" +pop+ "/info.0.json";
  
    this.httpClient.get<any>(prevUrl).subscribe(
      response => {
        console.log(response); 
        this.comic = new Comic(response.num, response.img, response.title)
        this.showSpinner = false;
        console.info(prevUrl);
        
        
      }
    );
  }
  getSearchedComic(comic: any) {
    
    const buildnewUrl = this.buildUrl(parseInt(comic.search));
    this.history.push(this.comic.num)
    this.showSpinner = true;
    this.httpClient.get<any>(buildnewUrl).subscribe(
      response => {
        console.log(response); 
        this.comic = new Comic(response.num, response.img, response.title)
        this.showSpinner = false;
        console.info(this.history)

        
      }
    );
  }

}
