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

  dataArray: DataObject[];
  metaArray: Metadata[];
  dataSetArray: Object[][];

  title = "Heatmap";

  ngOnInit() {
    this.metaArray = [];
    this.dataArray = [];
    this.dataSetArray = [];

    for (var i: number = 0; i < this.inputArray.length; i++){
      this.addMetaAndData(this.inputArray[i]);
    }
  }

  addMetaAndData(input: Object[]): void{
      for (var j: number = 1; j < input.length; j++){
        var tempData: Data = <Data> input[j];
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

        this.dataArray.push(new DataObject(input[0], tempMeta, tempData.value))
      }
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
          this.dataSetArray[0] = [];
        }
        else if(meta.selected == 2){
          meta.selected = 0;
          this.dataSetArray.splice(1);
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
      var temp: Object[] = [];
      temp[0] = "#"
      for(let data of this.dataArray){
        if(meta.compareTo(data.key) > -1){
          var contains: boolean = false;
          for(let tempvalue of temp){
            if(tempvalue == data.value){
              contains = true;
            }
          }
          if(contains == false){
            temp.push(data.value);
          }
        }
      }
      this.dataSetArray[0] = temp;
    }
    if(meta.selected == 2){
      for(let data of this.dataArray){
        if(meta.compareTo(data.key) > -1){
          var contains: boolean = false;
          for(var j: number = 1; j < this.dataSetArray.length; j++){
            if(this.dataSetArray[j][0] == data.value){
              contains = true;
            }
          }
          if(contains == false){
            var temp: Object[] = [];
            temp.push(data.value);
            for(var n: number = 1; n < this.dataSetArray[0].length; n++){
              temp.push(0);
            }
            this.dataSetArray.push(temp);
            
          }
        }
      }
      this.fillData();
    }
  }

  fillData(): void {
    var metaX: Metadata = this.findMeta(1);
    var metaY: Metadata = this.findMeta(2);

    for(var i: number = 1; i < this.dataSetArray.length; i++){
      for(let dataY of this.dataArray){
        if(metaY.compareTo(dataY.key) > -1 && dataY.value == this.dataSetArray[i][0]){
          for(let dataX of this.dataArray){
            if(dataY.identifier == dataX.identifier && metaX.compareTo(dataX.key) > -1){
              for(var j: number = 1; j < this.dataSetArray[0].length; j++){
                if(dataX.value == this.dataSetArray[0][j]){
                  this.dataSetArray[i][j] = <number> this.dataSetArray[i][j] + 1;
                }
              }
            }
          }
        }
      }
    }
  }

  findMeta(selected: number): Metadata {
    for(let meta of this.metaArray){
      if(meta.selected == selected){
        return meta;
      }
    }
  }
}

