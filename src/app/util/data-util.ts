import { OnInit } from '@angular/core';
import { Metadata } from '../models/metadata';
import { DataObject } from '../models/data-object';

export class DataUtil {
  
  ngOnInit() { }
  
  selectMetadata(selectedMetadata: Metadata, metaArray: Metadata[]): Metadata[] {
    for(let meta of metaArray) {
      if(meta.compareTo(selectedMetadata) > -1) {
        if(meta.selected == 0) {
          if(this.checkSelected(metaArray) < 2) {
            meta.selected = this.checkSelected(metaArray) + 1;
          }
        }
        else if(meta.selected == 1){
          for(let metatemp of metaArray) {
              if(metatemp.selected == 2) {
                  metatemp.selected = 1;
              }
          }
          meta.selected = 0;
        }
        else if(meta.selected == 2){
          meta.selected = 0;
        }
      }
    }
    return metaArray;
  }

  private checkSelected(metaArray: Metadata[]): number {
    var count: number = 0;
    for(let meta of metaArray){
      if(meta.selected > count){
        count = meta.selected;
      }
    }
    return count;
  }
}
