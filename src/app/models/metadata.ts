export class Metadata {
    metaname: string;
    selected: number = 0;

    constructor(metaname: any){
        this.metaname = metaname;
    }

    compareTo(compare: Metadata) : number{
        return this.metaname.indexOf(compare.metaname);
    }
}
