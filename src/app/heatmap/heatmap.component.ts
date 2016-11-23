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

  metaArray: Metadata[];
  dataSetArray: Object[][];

  //Injecting common data service, provided by app.component
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.metaArray = [];
    this.dataSetArray = [];

    this.getMetadata();
    this.getDataSet();
  }

  //Gets all metadata, from the injected data service
  private getMetadata(): void {
    this.dataService.getMetadata().then(metaArray => this.metaArray = metaArray);
  }

  //Gets the entire data set, from the injected data service
  private getDataSet(): void {
    this.dataService.getDataSet().then(dataSet => this.dataSetArray = dataSet);
  }

  //onSelect action from html file, runs every time, a metadata has been pressed
  onSelect(selectedMeta: Metadata): void {
    this.dataService.selectMetadata(selectedMeta).then(metaArray => this.metaArray = metaArray);
    this.getDataSet();
  }
}

