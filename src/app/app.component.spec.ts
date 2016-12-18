/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { DataService } from './util/data.service';
import { Data } from './models/data';
import { Metadata } from './models/metadata';

describe('App: VfvPkg', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeatmapComponent
      ],
      providers: [DataService]
    });
  });

  describe('DataService tests', () => {
    let dataservice:DataService = new DataService();

    //Initial test data
    let testData: Object[][] = [];
    testData.push([1, new Data("Data 1", 1), new Data("Data 2", 3), new Data("Data 3", "Test")]);
    testData.push([2, new Data("Data 1", 1), new Data("Data 2", 3), new Data("Data 3", "Test")]);
    testData.push([3, new Data("Data 1", 1), new Data("Data 2", 3), new Data("Data 3", "Test")]);

    dataservice.initializeData(testData);

    it('dataservice.getMetaData should return an array of metadata', () => {
      let metadata: Metadata[] = [];
      dataservice.getMetadata().then(metaArray => metadata = metaArray);

      expect(metadata.length).toBe(3);
    });

    it('dataservice.getDataSet should return a 2 dimensional array of the dataset', () => {
      let dataSetArray: Object[][] = [];
      dataservice.getDataSet().then(x => dataSetArray = x);

      expect(dataSetArray.length).toBe(3);
    });

    it('dataservice.selectMetadata should return an array of metadata', () => {
      let metadata: Metadata[] = [];
      dataservice.getMetadata().then(metaArray => metadata = metaArray);

      expect(metadata.length).toBe(3);
    });
  });
});
