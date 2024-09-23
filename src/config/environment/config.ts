const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config();
const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().default("development"),
  DATABASE_URL: Joi.string().uri().required(),
  LOG_LEVEL: Joi.string().default("info"),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  console.error("Config validation error(s):");
  error.details.forEach((detail: any) => {
    console.error(`- ${detail.message}`);
  });
  throw new Error("Environment variables validation failed.");
}

export default {
  port: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
  databaseUrl: envVars.DATABASE_URL,
  logLevel: envVars.LOG_LEVEL,
};
