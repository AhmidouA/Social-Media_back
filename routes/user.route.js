const express = require("express");
const router = express.Router();

const { userController, authController } = require("../controllers");


// auth
router.post("/signUp", authController.signUp);



// user
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
// put c'est pour changer completement une donnée (un champs)
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// patch c'est pour changer partiellement et non tout (ex: pour un tableau)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)


module.exports = router;