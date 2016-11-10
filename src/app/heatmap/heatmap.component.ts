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
  testArray: Object[][];

  title = "Heatmap";

  ngOnInit() {
    this.metaArray = [];
    this.dataSetArray = [];
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
          this.testArray[0] = [];
        }
        else if(meta.selected == 2){
          meta.selected = 0;
          this.testArray.splice(1);
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
          for(var j: number = 1; j < this.testArray.length; j++){
            if(this.testArray[j][0] == data.value){
              contains = true;
            }
          }
          if(contains == false){
            var tempHerp2: Object[] = [];
            tempHerp2.push(data.value);
            for(var n: number = 1; n < this.testArray[0].length; n++){
              tempHerp2.push(0);
            }
            this.testArray.push(tempHerp2);
            
          }
        }
      }
      this.fillData();
    }
  }

  fillData(): void {
    var metaX: Metadata;
    var metaY: Metadata;
    for(let meta of this.metaArray){
      if(meta.selected == 1){
        metaX = meta;
      }
      else if(meta.selected == 2){
        metaY = meta;
      }
    }
    for(var i: number = 1; i < this.testArray.length; i++){
      for(let data of this.dataSetArray){
        if(metaY.compareTo(data.key) > -1 && data.value == this.testArray[i][0]){
          for(let data2 of this.dataSetArray){
            if(data.identifier == data2.identifier && metaX.compareTo(data2.key) > -1){
              for(var j: number = 1; j < this.testArray[0].length; j++){
                if(data2.value == this.testArray[0][j]){
                  this.testArray[i][j] = <number> this.testArray[i][j] + 1;
                }
              }
            }
          }
        }
      }
    }
  }
  get1(): Object[] {
    var temp: Object[] = [];
    for(let i of this.testArray[0]){
      temp.push(i);
    }
    return temp;
  }
}

