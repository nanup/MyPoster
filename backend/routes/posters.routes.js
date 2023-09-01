const express = require('express');
const { check } = require('express-validator');

const checkToken = require('../middleware/verifyJwt.middleware');

const posterRouter = express.Router();
const postersController = require('../controllers/posters.controllers');

posterRouter.get('/:posterId', postersController.getPosterByPosterId);
posterRouter.get('/:userId', postersController.getPostersByUserId);

posterRouter.use(checkToken);

posterRouter.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('year').isLength({ min: 4, max: 4 }),
    check('image').not().isEmpty(),
  ],
  postersControllers.postPoster
);

posterRouter.patch(
  '/:pid',
  [
    check('title').not().isEmpty(),
    check('year').isLength({ min: 4, max: 4 }),
    check('image').not().isEmpty(),
  ],
  postersControllers.patchPosterById
);

posterRouter.delete('/:pid', postersControllers.deletePosterById);

module.exports = posterRouter;
