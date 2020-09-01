import queue from './utilities/queueConfig';
import transporter from './utilities/nodemailerConfig';
import dotenv from 'dotenv';

dotenv.config();

queue.process(async (job: any, done: any) => {
    if(job.data.type === 'account_confirmation'){
        await transporter.sendMail({
            from: "'Api', <mail@api.com>",
            to: job.data.email,
            subject: 'Confirm your account',
            text: `To confirm your account please access http://${process.env.API_URL}:${process.env.SERVER_PORT}/auth/confirm-account/?token=${job.data.token}`
        });
    }else if(job.data.type === 'password_reset'){
        await transporter.sendMail({
            from: "'Api', <mail@api.com>",
            to: job.data.email,
            subject: 'Password reset',
            text: `To change your password please access http://${process.env.API_URL}:${process.env.SERVER_PORT}/auth/change-password/?token=${job.data.token}`
        });
    }
    return done(null, job.data)
});