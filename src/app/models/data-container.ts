import { DataUtil } from '../util/data-util'
import { Metadata } from './metadata'
import { DataObject } from './data-object'
import { Data } from './data'

export class DataContainer {
  private dataArray: DataObject[];
  private metaArray: Metadata[];
  private dataSetArray: Object[][];
  private datautil: DataUtil = new DataUtil();
  
  constructor(){}
  
  initializeData(input: Object[][]): void {
    this.dataArray = [];
    this.metaArray = [];
    this.dataSetArray = [];
    
    for (var i: number = 0; i < input.length; i++) {
      this.addMetaAndData(input[i]);
    }
  }
  
  private addMetaAndData(input: Object[]): void{
    for (var j: number = 1; j < input.length; j++) {
      var tempData: Data = <Data> input[j];
      var tempMeta: Metadata = new Metadata(tempData.key);
      var compareValue: number = -1;

      for (let key of this.metaArray) {
        if (key.compareTo(tempMeta) > -1) {
          compareValue++;
        }
      }

      if (compareValue < 0) {
        this.metaArray.push(tempMeta);
      }

      this.dataArray.push(new DataObject(input[0], tempMeta, tempData.value))
    }
  }
  
  getMetaData(): Metadata[] {
    return this.metaArray;
  }

  getDataSet(): Object[][] {
    return this.dataSetArray;
  }

  selectMetadata(selectedMeta: Metadata): void {
    this.metaArray = this.datautil.selectMetadata(selectedMeta, this.metaArray);
  }
}