import { Component, Input } from '@angular/core';
import { DataObject } from '../models/data-object';
import { Metadata } from '../models/metadata';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent {
  @Input()
  inputArray: Object[][];

  public test: number = 0;

  dataArray: DataObject[];
  metaArray: Metadata[];

  contructor(){
    this.test = 2;
  }
}
