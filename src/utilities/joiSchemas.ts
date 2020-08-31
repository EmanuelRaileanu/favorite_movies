import Joi from 'joi';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schemas = {
    movie: Joi.object().keys({
        title: Joi.string().min(3).max(40).required(),
        description: Joi.string(),
        runtime: Joi.string(),
        budget: Joi.number(),
        gross: Joi.number(),
        overallRating: Joi.number(),
        releaseDate: Joi.date(),
        ProductionCompanyId: Joi.number().min(1),
        categories: Joi.array().items(Joi.object({id: Joi.number()}))
    }),
    actor: Joi.object().keys({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
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
        email: Joi.string().regex(EMAIL_REGEX).email().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        dateOfBirth: Joi.date().required().iso()
    }),
    userLogin: Joi.object().keys({
        email: Joi.string().regex(EMAIL_REGEX).email().required(),
        password: Joi.string().required()
    })
};

export default schemas;