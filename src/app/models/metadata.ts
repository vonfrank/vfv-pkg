export class Metadata {
    metaname: string;

    constructor(metaname: any){
        this.metaname = metaname;
    }

    compareTo(compare: Metadata) : number{
        return this.metaname.indexOf(compare.metaname);
    }
}
