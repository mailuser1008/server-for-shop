const express = require("express");
const cors = require("cors");
let apiRoutes = require("./routes/routes");

const app = express();

app.use(cors(""));
app.use(express.json());
app.use("", apiRoutes);

const port = 3000;

app.listen(port, "192.168.13.48", () => {
  console.log("server is running on port" + " " + port);
});
