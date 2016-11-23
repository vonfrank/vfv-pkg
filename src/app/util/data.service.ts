import { Injectable, OnInit } from '@angular/core';
import { Metadata } from '../models/metadata';
import { DataContainer } from './data-container';

//Injectable data service, for VFV-PKG. Data is provided by the data container

@Injectable()
export class DataService {
  private dataContainer: DataContainer = new DataContainer();
  
  //Initializes the VFV-PKG with the provided input data
  initializeData(input: Object[][]): void {
    this.dataContainer.initializeData(input);
  }
  
  //Gets all metadata, from the injected data service, return the metadata as a Metadata[]
  getMetadata(): Promise<Metadata[]> {
    return Promise.resolve(this.dataContainer.getMetaData());
  }

  //Gets the entire data set, from the injected data service, return the data set as an Object[][]
  getDataSet(): Promise<Object[][]> {
    return Promise.resolve(this.dataContainer.getDataSet());
  }

  //Sets the selected metadata, with the correct selected number, return the updated metadata as a Metadata[][]
  selectMetadata(selectedMeta: Metadata): Promise<Metadata[]> {
    this.dataContainer.selectMetadata(selectedMeta)
    return Promise.resolve(this.getMetadata());
  }
}
