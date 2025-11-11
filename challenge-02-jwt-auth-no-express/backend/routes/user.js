// /me, /users
const { sendSuccess, sendError } = require('../core/response');
const { getUserById, getAllUsers } = require('../services/userService');

async function handleMeRoute(req, res) {
  try {
    const user = await getUserById(req.user.userId);
    sendSuccess(res, {
      id: user.id,
      username: user.username
    });
  } catch (error) {
    sendError(res, 404, error.message);
  }
}

async function handleUsersRoute(req, res) {
  try {
    const users = await getAllUsers();
    sendSuccess(res, users);
  } catch (error) {
    sendError(res, 500, error.message);
  }
}

module.exports = {
  handleMeRoute,
  handleUsersRoute
};