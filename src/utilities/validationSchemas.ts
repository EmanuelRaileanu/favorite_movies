import Joi from 'joi';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schemas = {
    saveMovie: Joi.object().keys({
        title: Joi.string().min(3).max(40).required().error(() => {throw 'Title is required.'}),
        description: Joi.string().required().error(() => {throw 'Description is required.'}),
        runtime: Joi.string().required().error(() => {throw 'Runtime is required.'}),
        budget: Joi.number(),
        gross: Joi.number(),
        overallRating: Joi.number().required().error(() => {throw 'Rating is required.'}),
        releaseDate: Joi.date().required().error(() => {throw 'Release date is required.'}),
        ProductionCompanyId: Joi.number().min(1).required().error(() => {throw 'Production company is required.'}),
        categories: Joi.array().items(Joi.object({id: Joi.number(), name: Joi.string()}))
    }),
    updateMovie: Joi.object().keys({
        title: Joi.string().min(3).max(40),
        description: Joi.string(),
        runtime: Joi.string(),
        budget: Joi.number(),
        gross: Joi.number(),
        overallRating: Joi.number(),
        releaseDate: Joi.date(),
        ProductionCompanyId: Joi.number().min(1),
        categories: Joi.array().items(Joi.object({id: Joi.number(), name: Joi.string()}))
    }),
    saveActor: Joi.object().keys({
        firstName: Joi.string().min(3).max(30).required().error(() => {throw 'First name is required.'}),
        lastName: Joi.string().min(3).max(30).required().error(() => {throw 'Last name is required.'}),
        fbProfileLink: Joi.string(),
        shortDescription: Joi.string().required().error(() => {throw 'A short description is required'}),
        nationalityId: Joi.number().required().error(() => {throw 'Nationality is required.'}),
        nationality: Joi.string(),
        dateOfBirth: Joi.date(),
        movies: Joi.array().items(Joi.object({id: Joi.number()})),
        studies: Joi.array().items(Joi.object({graduationYear: Joi.date(), institutionId: Joi.number(), degreeId: Joi.number()})),
        awards: Joi.array().items(Joi.object({year: Joi.number(), movie: Joi.string(), movieCharacter: Joi.string(), awardId: Joi.number()}))
    }),
    updateActor: Joi.object().keys({
        firstName: Joi.string().min(3).max(30),
        lastName: Joi.string().min(3).max(30),
        fbProfileLink: Joi.string(),
        shortDescription: Joi.string(),
        nationalityId: Joi.number(),
        nationality: Joi.string(),
        dateOfBirth: Joi.date(),
        movies: Joi.array().items(Joi.object({id: Joi.number()})),
        studies: Joi.array().items(Joi.object({graduationYear: Joi.date(), institutionId: Joi.number(), degreeId: Joi.number()})),
        awards: Joi.array().items(Joi.object({year: Joi.number(), movie: Joi.string(), movieCharacter: Joi.string(), awardId: Joi.number()}))
    }),
    userRegister: Joi.object().keys({
        email: Joi.string().regex(EMAIL_REGEX).email().required().error(() => {throw 'Please enter a valid email.'}),
        name: Joi.string().required().error(() => {throw 'Name is required.'}),
        password: Joi.string().required().error(() => {throw 'Password is required.'}),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().error(() => {throw 'Passwords do not match.'}),
        dateOfBirth: Joi.date().required().iso().error(() => {throw 'Please enter your date of birth.'})
    }),
    userLogin: Joi.object().keys({
        email: Joi.string().regex(EMAIL_REGEX).email().required().error(() => {throw 'Please enter a valid email.'}),
        password: Joi.string().required().error(() => {throw 'Password is required.'})
    })
};

export default schemas;