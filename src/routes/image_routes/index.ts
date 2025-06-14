import Express from "express";

import "dotenv/config";
import multer from "multer";
import { imageValidator, paramsMustContain } from "../../validators";
import firebase from "../../config/firebase";
import { ImageNotFoundError } from "../../errors";

const imageRouter = Express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

imageRouter.post(
  "/",
  upload.single("data"),
  imageValidator,
  async (req, res) => {
    const bucket = firebase.storage().bucket();
    try {
      const file = bucket.file(Date.now().toString());
      await file.save(req.file!.buffer, {
        contentType: req.file!.mimetype,
      });

      return res.status(200).json({
        url:
          "https://firebasestorage.googleapis.com/v0/b/" +
          process.env.FIREBASE_BUCKET +
          "/o/" +
          file.name +
          "?alt=media",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    // const storage = getStorage(firebase);
    // const storageRef = ref(storage, Date.now().toString());

    // try {
    //   const name = await uploadBytes(storageRef, req.file!.buffer, {
    //     contentType: req.file!.mimetype,
    //   }).then(
    //     (snapshot) =>
    //       "https://firebasestorage.googleapis.com/v0/b/" +
    //       process.env.FIREBASE_BUCKET +
    //       "/o/" +
    //       snapshot.metadata.name +
    //       "?alt=media"
    //   );

    //   return res.status(200).json({ url: name });
    // } catch (err) {
    //   return res.status(500).json(err);
    // }
  }
);

// imageRouter.delete("/:id", async (req, res) => {
//   const storage = getStorage(firebase);
//   const storageRef = ref(storage, req.params.id);

//   try {
//     await deleteObject(storageRef);
//     return res.status(200).json({ status: "Ok" });
//   } catch (err: any) {
//     if (err.code === "storage/object-not-found") {
//       const error = new ImageNotFoundError();
//       return res.status(error.code).json(error);
//     }
//     return res.status(500).json(err);
//   }
// });

export default imageRouter;
