const express = require('express');
const { UserAgent, User } = require('../models');
const requestIp = require('request-ip');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');

const router = express.Router();

router.use(async (req, res, next) => {
  if (isLoggedIn) {
    try {
      const userAgentData = await UserAgent.findOne({ where: { email: 'tester2@gmail.com'} });
      const loggedInUser = await User.findOne({ where: { email: 'tester2@gmail.com' } });
      let currentIp = requestIp.getClientIp(req);
      if (!userAgentData || !loggedInUser) {
        return res.status(200).json('로그인을 먼저 해주세요.');
      } else if (userAgentData.userAgent !== req.headers['user-agent'] || userAgentData.userIP !== currentIp) {
      return res.status(200).json('초기 로그인과 다른 환경에서 로그인되어 있습니다! 로그아웃을 해주세요.');
      }
      else return res.status(200).json('로그인 시의 환경과 일치합니다. 작업을 이어나가주세요.');
    } catch (error) {
      console.error('로그아웃 처리중 에러:', error);
    }
  }
  next();
});

module.exports = router;
