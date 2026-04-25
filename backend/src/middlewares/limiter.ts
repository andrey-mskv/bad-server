import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  limit: 100,               // 100 запросов

  standardHeaders: true,    // RateLimit-* headers
  legacyHeaders: false,

  // опционально: более явный key (по IP)
//   keyGenerator: (req) => req.ip,

  message: {
    message: 'Слишком много запросов, попробуйте позже',
  },
});
