import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../util/data.service';
import { DataObject } from '../models/data-object';
import { Metadata } from '../models/metadata';
import { Data } from '../models/data';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent {
  title = "Heatmap";

  color = "96,125,139";

  metaArray: Metadata[];
  dataSetArray: Object[][];
  dataArray: Object[];

  xArray: Object[];

  maxValue: number;

  //Injecting common data service, provided by app.component
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.metaArray = [];
    this.dataSetArray = [];
    
    this.xArray = [];

    this.maxValue = 0;

    this.getMetadata();
    this.getDataSet();
  }

  //onSelect action from html file, runs every time, a metadata has been pressed
  onSelect(selectedMeta: Metadata): void {
    this.dataService.selectMetadata(selectedMeta).then(metaArray => this.metaArray = metaArray);
    this.getDataSet();

    this.generateViewX();
  }

  //Gets all metadata, from the injected data service
  private getMetadata(): void {
    this.dataService.getMetadata().then(metaArray => this.metaArray = metaArray);
  }

  //Gets the entire data set, from the injected data service
  private getDataSet(): void {
    this.dataService.getDataSet().then(dataSet => this.dataSetArray = dataSet);
    this.maxValue = 0;
    for(var i: number = 1; i < this.dataSetArray.length; i++) {
      for(var j: number = 1; j < this.dataSetArray[i].length; j++) {
        if(<number>this.dataSetArray[i][j] > this.maxValue) {
          this.maxValue = <number>this.dataSetArray[i][j];
        }
      }
    }
  }

  private generateViewX(): void {
    this.xArray = [];
    for(var i: number = 1; i < this.dataSetArray[0].length; i++) {
      this.xArray.push(this.dataSetArray[0][i]);
    }
  }

  private generateViewY(): Object[] {
    var tempArray: Object[] = [];
    for(var i: number = 1; i < this.dataSetArray.length; i++) {
      tempArray.push(this.dataSetArray[i][0]);
    }

    return tempArray;
  }

  private generateViewData(pos: number): Object[] {
    this.dataArray = [];
    for(var i: number = 1; i < this.dataSetArray[pos + 1].length; i++) {
      this.dataArray.push(this.dataSetArray[pos + 1][i]);
    }

    return this.dataArray;
  }
}

