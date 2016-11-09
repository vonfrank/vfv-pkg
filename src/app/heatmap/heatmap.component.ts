import { Component, Input, OnInit } from '@angular/core';
import { DataObject } from '../models/data-object';
import { Metadata } from '../models/metadata';
import { Data } from '../models/data';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent {
  @Input()
  inputArray: Object[][];

  title = "Heatmap";

  dataSetArray: DataObject[];
  metaArray: Metadata[];

  ngOnInit() {
    this.metaArray = [];
    this.dataSetArray = [];

    for (var i: number = 0; i < this.inputArray.length; i++){
      var tempArray: Object[] = this.inputArray[i];
      for (var j: number = 1; j < tempArray.length; j++){
        var tempData: Data = <Data> tempArray[j];
        var tempMeta: Metadata = new Metadata(tempData.key);
        var compareValue: number = -1;

        for (let key of this.metaArray){
          if (key.compareTo(tempMeta) > -1){
            compareValue++;
          }
        }

        if (compareValue < 0){
          this.metaArray.push(tempMeta);
        }

        this.dataSetArray.push(new DataObject(tempArray[0], tempMeta, tempData.value))
      }
    }

    //Test metaArray
    for(let item of this.metaArray){
      console.log(item);
    }
    console.log(this.metaArray.length);

    //Test dataset
    for(let item of this.dataSetArray){
      console.log(item);
    }
  }

  
}
