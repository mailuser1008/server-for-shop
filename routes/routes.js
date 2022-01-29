const express = require("express");
const cors = require("cors");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");

const app = express();

app.use(cors(""));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = "mongodb+srv://username08:qodirovoybekjon4929@for-app.j2zwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, db) => {
  if (err) {
    console.log(err);
  } else {
    let dbs = db.db("for-shop");

    // ===============================================

    router.post("/login", (req, res) => {
      const { email, password } = req.body;
      if (req.body?.email && req.body?.password) {
        bcrypt.hash(password, 10, (err, hash) => {
          dbs.collection("user_informations").findOne({ email: email }, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result) {
                console.log("siz pochtsangiz royxatdan o'tdi");
                bcrypt.compare(password, result.password, (err, result) => {
                  if (!result) {
                    res.send(400, {
                      message: "Sizning parolingiz xato",
                    });
                  } else {
                    dbs.collection("user_informations").findOne({ email: email }, (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        if (result) {
                          res.send(result);
                        } else {
                          res.send(400, {
                            message: "Bunday foydalanuvchi mavjud emas!",
                          });
                        }
                      }
                    });
                  }
                });
              } else {
                console.log("siz royxatdan o'tmadingiz");
                res.send(400, {
                  message: "Bunday foydalanuvchi mavjud emas",
                });
              }
            }
          });
        });
      } else {
      }
    });

    // ===============================================

    router.post("/register", (req, res) => {
      const { first_name, last_name, email, password } = req.body.params;
      if (req.body?.params?.first_name && req.body?.params?.last_name && req.body?.params?.email && req.body?.params?.password) {
        bcrypt.hash(password, 10, (err, hash) => {
          dbs.collection("user_informations").findOne({ email: email }, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result) {
                console.log("bunday foydalanuvchi mavjud");
                res.send(400, {
                  messag: "bunday foydalanuvchi mavjud",
                });
              } else {
                console.log("foydalanuvchi yaratildi");
                dbs.collection("user_informations").distinct("id", {}, {}, (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let all_ids = result;
                    let end_id = all_ids[all_ids.length - 1];
                    end_id += 1;
                    bcrypt.hash(password, 10, (err, hash) => {
                      dbs.collection("user_informations").insertMany([
                        {
                          id: end_id,
                          first_name: first_name,
                          last_name: last_name,
                          email: email,
                          password: hash,
                        },
                      ]);
                      res.send({
                        message: "Foydalanuvchi yaratildi!",
                      });
                    });
                  }
                });
              }
            }
          });
        });
      } else {
        res.send(400, {
          message: "Ma'lumotlarni to'liq kiriting!",
        });
      }
    });

    // ===============================================

    router.get("/get-all-users", (req, res) => {
      dbs
        .collection("user_informations")
        .find({})
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
    });

    // ===============================================

    router.delete("/delete-user", (req, res) => {
      const user_id = req.query;
      const id = user_id.id;
      if (id) {
        dbs.collection("user_informations").deleteOne({ id: ~~id }, (err, result) => {
          if (err) {
            res.send(400, {
              message: "Foydalanuvchi o'chirilmadi!",
            });
          } else {
            res.send(200, {
              message: "Foydalanuvchi muvoffaqiyatli o'chirildi!",
            });
          }
        });
      } else {
        res.send(400, {
          message: "Foydalanuvchi o'chirilmadi!",
        });
      }
    });

    // ===============================================

    router.post("/search-user", (req, res) => {
      const serch_user = req.body.email;
      dbs
        .collection("user_informations")
        .find({ email: { $regex: `${serch_user}` } })
        .toArray((err, result) => {
          if (err) {
            console, log(err);
          } else {
            res.send(result);
          }
        });
    });

    // ===============================================

    // ==============================================

    router.post("/create-item", (req, res) => {
      console.log(req.body);
    });

    // ===============================================
  }
});

module.exports = router;
