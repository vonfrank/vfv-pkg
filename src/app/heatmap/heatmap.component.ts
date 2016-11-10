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
  dataSetArray: DataObject[];
  metaArray: Metadata[];
  xaxis: Object[];
  yaxis: Object[];
  testArray: Object[][];

  title = "Heatmap";

  ngOnInit() {
    this.metaArray = [];
    this.dataSetArray = [];
    this.xaxis = [];
    this.yaxis = [];
    this.testArray = [];

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
    //for(let item of this.metaArray){
      //console.log(item);
    //}
    //console.log(this.metaArray.length);

    //Test dataset
    //for(let item of this.dataSetArray){
      //console.log(item);
    //}
  }

  onSelect(selectedMetadata: Metadata): void {
    for(let meta of this.metaArray) {
      if(meta.compareTo(selectedMetadata) > -1){
        if(meta.selected == 0){
          if(this.checkSelected() < 2){
          meta.selected = this.checkSelected() + 1;
          this.fill(meta);
          }
        }
        else if(meta.selected == 1){
          meta.selected = 0;
          this.xaxis = [];
        }
        else if(meta.selected == 2){
          meta.selected = 0;
          this.yaxis = [];
        }
      }
    }
  }

  checkSelected(): number {
    var count: number = 0;
    for(let meta of this.metaArray){
      if(meta.selected > count){
        count = meta.selected;
      }
    }
    return count;
  }

  fill(meta: Metadata): void {
    if(meta.selected == 1){
      var tempHerp: Object[] = [];
      tempHerp[0] = "#"
      for(let data of this.dataSetArray){
        if(meta.compareTo(data.key) > -1){
          var contains: boolean = false;
          for(let test of tempHerp){
            if(test == data.value){
              contains = true;
            }
          }
          if(contains == false){
            tempHerp.push(data.value);
          }
        }
      }
      this.testArray[0] = tempHerp;
    }
    if(meta.selected == 2){
      for(let data of this.dataSetArray){
        if(meta.compareTo(data.key) > -1){
          var contains: boolean = false;
          for(let test of this.yaxis){
            if(test == data.value){
              contains = true;
            }
          }
          if(contains == false){
            this.yaxis.push(data.value);
          }
        }
      }
    }
    //Test testArray
    for(let item of this.testArray){
      console.log(item);
    }
  }
}
