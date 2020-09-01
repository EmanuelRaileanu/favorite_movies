import Job from '../entities/jobs';
import queue from '../utilities/queueConfig';

async function main(){
    const failedJobs = (await new Job().where({status: 'failed'}).fetchAll({require: false})).toJSON();
    const len = failedJobs.length;
    if(!len){
        console.log('There are no failed jobs');
        return;
    }
    for(let failedJob of failedJobs){
        const newJob = {
            type: failedJob.type,
            email: failedJob.email,
            token: failedJob.token
        };
        const job = queue.createJob(newJob);
        job.save();
        job.on('succeeded', async () => {
            await new Job().where({id: failedJob.id}).save({status: 'succeeded'}, {method: 'update'});
        });
    }
};

main();
