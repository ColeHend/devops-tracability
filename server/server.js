const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4545;
//------rollbar
// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "78decb6f54b54aeaa763dc94d462a1ae",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");
//-----------------------
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const thePeople = [];
function checkExist(person) {
  for (let i = 0; i < thePeople.length; i++) {
    if (
      person.last === thePeople[i].last &&
      person.first === thePeople[i].first
    ) {
      return true;
    }
  }
  return false;
}
app.get("/people", (req, res) => {
  res.status(200).send(thePeople);
});

app.post("/add", (req, res) => {
  let person = req.body;
  let checkPerson = checkExist(person);
  
  if (thePeople.length === 0) {
    thePeople.push(person);
    res.status(200).send(person);
  } else {
    if (thePeople.length > 0) {
      if (checkPerson === true) {
        rollbar.critical("Already in use");
        res.status(400).send("Already in use");
      } else if (person.text === "yellow" && checkPerson === false) {
        rollbar.warning("bad color choice");
        thePeople.push(person);
        res.status(200).send(person);
      } else {
        thePeople.push(person);
        res.status(200).send(person);
      }
    }
  }
});
try {
  funky();
} catch (error) {
  rollbar.log(error);
}
app.use(rollbar.errorHandler());

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
