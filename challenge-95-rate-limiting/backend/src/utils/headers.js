const setRateLimitHeaders = (res, limit, remaining, resetTime) => {
  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-RateLimit-Reset', resetTime);
};

const getRateLimitInfo = (req) => {
  return {
    limit: req.rateLimit.limit,
    remaining: req.rateLimit.remaining,
    resetTime: req.rateLimit.resetTime
  };
};

module.exports = {
  setRateLimitHeaders,
  getRateLimitInfo
};