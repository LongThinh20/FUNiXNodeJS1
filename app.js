const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const Staff = require("./models/staff");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const staffRoutes = require("./routes/staff");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  user
    .findById("61e96bc9b588eea483cd14f3")
    .then((staff) => {
      req.staff = staff;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(staffRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://studynodejs:nodejs12345@cluster0.nxkbx.mongodb.net/Staff?retryWrites=true&w=majority"
  )
  .then((result) => {
    Staff.findOne().then((staff) => {
      if (!staff) {
        const staff = new Staff({
          name: "Nguyên Văn A",
          doB: "20-2-1994",
          salaryScale: 1,
          department: "IT",
          annualLeave: 8,
          image:
            "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg"
        });
        staff.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
