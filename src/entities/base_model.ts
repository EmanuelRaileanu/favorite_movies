import { bookshelf } from '../utilities/knexconfig';

export class BaseModel extends bookshelf.Model<any>{
    checkIfExists(trx: any){
        return this.fetch({require: false, transacting: trx});
    }

    getId(trx: any){
        return this.fetch({require: false, transacting: trx}).get('id');
    }
}