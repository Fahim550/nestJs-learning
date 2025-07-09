import * as Joi from 'joi';

export default Joi.object({
  JWT_TOKEN_SECRET: Joi.string().required(),
  JWT_TOKEN_EXPIRATION: Joi.number().default('3600'),
  REFRESH_TOKEN_EXPIRATION: Joi.number().default('604,800'),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),

  //   BCRYPT_SALT_ROUNDS: Joi.number().default(10),
});
