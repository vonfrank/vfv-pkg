import { Metadata } from './metadata'

export class DataObject {
    identifier: any;
    key: Metadata;
    value: any;

    constructor(identifier: any, key: Metadata, value: any){
        this.identifier = identifier;
        this.key = key;
        this.value = value;
    }
}