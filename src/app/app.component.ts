import { Component } from '@angular/core';
import { Data } from './models/data';

@Component({
  selector: 'vfv-pkg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //testData: Object[][] = [["herp", "derp"]]
  testData: Object[][] = [
    [1, new Data("Rigor", 1), new Data("Relevance", 2), new Data("Title", "Von Frank is awesome"), new Data("Author", "Von Frank"), new Data("Year", 2016)],
    [2, new Data("Rigor", 0.5), new Data("Relevance", 0), new Data("Title", "Von Frank is not awesome"), new Data("Author", "Marco K"), new Data("Year", 2013)],
    [3, new Data("Rigor", 1), new Data("Relevance", 4), new Data("Title", "Von Frank is not awesome"), new Data("Author", "Marco K"), new Data("Year", 2015)],
    [4, new Data("Relevance", 0), new Data("Title", "Von Frank is not awesome"), new Data("Author", "Marco K"), new Data("Year", 2016)],
    [5, new Data("Herp", "Derp"), new Data("Derp", 0), new Data("Title", "Von Frank is not awesome"), new Data("Author", "Marco K"), new Data("Year", 2016)]];
}
