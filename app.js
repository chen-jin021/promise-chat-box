const express = require("express");
const app = express();

const mongoose = require("mongoose");
//require our schema
require("./db.js");

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
//bodyparser: this is urlencode the key-value pairs it receives (it assumes everything is key-value pair)
app.use(express.urlencoded({ extended: false }));

const Message = mongoose.model("Message");

//*** mongoose gives both callback version API and aysnc Promise API */
//async version
app.get("/api/messages", async (req, res) => {
  //if we want to check error, we could do a try except
  const messages = await Message.find({});

  res.json(
    messages.map((m) => {
      return { text: m.text };
    })
  );
});

app.post("api/messages", async (req, res) => {
  const m = new Message({
    text: req.body.text,
  });
  const savedMessage = await m.save();
  res.send({ success: true, savedMessage: { text: savedMessage.text } });
});

/* nested callback version
//retrieve this messages
app.get("/api/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.json(
      messages.map((m) => {
        //to avoid object_id etc...
        return { text: m.text };
      })
    );
  });
});
*/
app.listen(3000);
