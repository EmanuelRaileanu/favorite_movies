import { BaseModel } from './base_model';

export default class Job extends BaseModel{
    get tableName(){
        return 'jobs';
    }
};