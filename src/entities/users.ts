import { bookshelf } from '../utilities/knexconfig';
import { BaseModel } from './base_model';

export class User extends BaseModel{
    get tableName(){
        return 'users';
    }
}