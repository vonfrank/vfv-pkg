import { Component, Input } from '@angular/core';
import { DataService } from './util/data.service';
import { Data } from './models/data';
import { Metadata } from './models/metadata';

@Component({
  selector: 'vfv-pkg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  @Input()
  inputArray: Object[][];

  testData: Object[][] = [
    [1, new Data("Rigor", 1), new Data("Relevance", 0), new Data("Title", "An experience base with rights management for global software engineering"), new Data("Author", "Averbakh, Anna & Knauss, Eric & Liskin, Olga"), new Data("Year", 2011)],
    [2, new Data("Rigor", 1.5), new Data("Relevance", 0), new Data("Title", "Analyzing project risks within a cultural and organizational setting"), new Data("Author", "Ma, Wenting & Liu, Lin & Feng, Wenzhong & Shan, Yuhui & Peng, Fei"), new Data("Year", 2009)],
    [3, new Data("Rigor", 2), new Data("Relevance", 4), new Data("Title", "Cultural influences and differences in software process improvement programs"), new Data("Author", "Wong, Bernard & Hasan, Sazzad"), new Data("Year", 2008)],
    [4, new Data("Relevance", 1.5), new Data("Rigor", 4), new Data("Title", "Improving quality through software process improvement in Thailand: initial analysis"), new Data("Author", "Phongpaibul, Monvorath & Boehm, Barry"), new Data("Year", 2005)],
    [5, new Data("Rigor", 2), new Data("Relevance", 4), new Data("Title", "Perceived productivity threats in large agile development projects"), new Data("Author", "Hannay, Jo E. & Benestad, Hans Christian"), new Data("Year", 2010)],
    [6, new Data("Rigor", 0), new Data("Relevance", 0), new Data("Title", "Project management for the 21st century: supporting collaborative design through risk analysis"), new Data("Author", "Smith, Jamie L. & Bohner, Shawn A. & McCrickard, D. Scott"), new Data("Year", 2008)],
    [7, new Data("Rigor", 0.5), new Data("Relevance", 2), new Data("Title", "Defect prevention and process improvement methodology for outsourced software projects"), new Data("Author", "Faizan M., Ulhaq S., Khan M.N.A."), new Data("Year", 2014)]];

    constructor(private dataservice: DataService){
      if(this.inputArray == null) {
        this.dataservice.initializeData(this.testData);
      } else {
        this.dataservice.initializeData(this.inputArray);
      }
    }
}
