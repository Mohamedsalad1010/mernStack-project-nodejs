import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 80 ,
      message: 'Too many requests. Please try again later.'
})