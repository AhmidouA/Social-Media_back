const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/error.utils");
const fs = require("fs");

const uploadController = {
  async uploadProfil(req, res) {
    if (req.file.size > 500000) {
      throw Error("La taille du fichier dépasse la limite maximale");
    }
    const file = req.file.filename;
    // console.log("{ picture }>>>>>>", file);

    try {
      const user = await UserModel.findByIdAndUpdate(
        req.body.userId,
        { $set: { picture: "./uploads/profil/" + file } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      // console.log("user", user)

      if (!user) {
        res
          .status(400)
          .json({
            message:
              "La photo n'a pas pu être enregistrée dans la base de données",
          });
      }

      return res.status(200).json({
        user,
        message: "La photo a été enregistrée dans la base de données",
      });
    } catch (err) {
      console.error("err Picture add", err);
      return res.status(500).json({ message: err.message });
    }
  },

  // Module stream Image
  streamPicture(req, res) {
    const file = req.params.file;
    const filePath = `${__dirname}/../client/public/uploads/profil/${file}`;
    // console.log("file dans stream Picture", filePath);
    fs.createReadStream(filePath).pipe(res);
  },
};

module.exports = uploadController;
