import { Metadata } from '../models/metadata';
import { DataObject } from '../models/data-object';

export class DataUtil {
  
  selectMetadata(selectedMetadata: Metadata, metaArray: Metadata[]): Metadata[] {
    for(let meta of metaArray) {
      if(meta.compareTo(selectedMetadata) > -1) {
        if(meta.selected == 0) {
          if(this.checkSelected(metaArray) < 2) {
            meta.selected = this.checkSelected(metaArray) + 1;
          }
        }
        else if(meta.selected == 1) {
          for(let metatemp of metaArray) {
            if(metatemp.selected == 2) {
              metatemp.selected = 1;
            }
          }
          meta.selected = 0;
        }
        else if(meta.selected == 2) {
          meta.selected = 0;
        }
      }
    }
    return metaArray;
  }

  generateDataSet(dataSetArray: Object[][], dataArray: DataObject[], metaArray: Metadata[]): Object[][] {
    dataSetArray = [];
    for(let meta of metaArray) {
      if(meta.selected == 1) {
        var temp: Object[] = [];
        temp[0] = "#"
        for(let data of dataArray) {
          if(meta.compareTo(data.key) > -1) {
            var contains: boolean = false;
            for(let tempvalue of temp) {
              if(tempvalue == data.value) {
                contains = true;
              }
            }
            if(contains == false) {
              temp.push(data.value);
            }
          }
        }
        dataSetArray[0] = temp;
      }
      if(meta.selected == 2) {
        for(let data of dataArray) {
          if(meta.compareTo(data.key) > -1) {
            var contains: boolean = false;
            for(var j: number = 1; j < dataSetArray.length; j++) {
              if(dataSetArray[j][0] == data.value) {
                contains = true;
              }
            }
            if(contains == false) {
              var temp: Object[] = [];
              temp.push(data.value);
              for(var n: number = 1; n < dataSetArray[0].length; n++) {
                temp.push(0);
              }
              dataSetArray.push(temp);
            }
          }
        }
        this.fillData(metaArray, dataSetArray, dataArray);
      }
    }
    return dataSetArray;
  }

  private checkSelected(metaArray: Metadata[]): number {
    var count: number = 0;
    for(let meta of metaArray) {
      if(meta.selected > count) {
        count = meta.selected;
      }
    }
    return count;
  }

  private fillData(metaArray: Metadata[], dataSetArray: Object[][], dataArray: DataObject[]): void {
    var metaX: Metadata = this.findMeta(1, metaArray);
    var metaY: Metadata = this.findMeta(2, metaArray);

    for(var i: number = 1; i < dataSetArray.length; i++) {
      for(let dataY of dataArray) {
        if(metaY.compareTo(dataY.key) > -1 && dataY.value == dataSetArray[i][0]) {
          for(let dataX of dataArray) {
            if(dataY.identifier == dataX.identifier && metaX.compareTo(dataX.key) > -1) {
              for(var j: number = 1; j < dataSetArray[0].length; j++) {
                if(dataX.value == dataSetArray[0][j]) {
                  dataSetArray[i][j] = <number> dataSetArray[i][j] + 1;
                }
              }
            }
          }
        }
      }
    }
  }

  private findMeta(selected: number, metaArray: Metadata[]): Metadata {
    for(let meta of metaArray) {
      if(meta.selected == selected) {
        return meta;
      }
    }
  }
}
