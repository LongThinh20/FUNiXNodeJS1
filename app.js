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

const PORT = 3001;

// Parse body
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  Staff.findById("62215f793b0f6cdff8ff1053")
    .then((staff) => {
      req.staff = staff;
      next();
    })
    .catch((err) => console.log(err));
});
app.use(staffRoutes);
app.use(errorController.get404);

//connect to db
mongoose
  .connect(
    "mongodb+srv://studynodejs:nodejs12345@cluster0.nxkbx.mongodb.net/Staff?retryWrites=true&w=majority"
  )
  .then((result) => {
    Staff.findOne().then((staff) => {
      if (!staff) {
        const staff = new Staff({
          name: "Nguyên Văn A",
          doB: new Date(1994, 02, 20),
          salaryScale: 1.5,
          startDate: new Date(2022, 02, 02),
          department: "IT",
          annualLeave: 12,
          workTime: [],
          offTime: [],
          covidInfo: {
            vaccineInfo: [],
            infected: [],
            tempInfo: []
          },
          image:
            "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg"
        });
        staff.save();
      }
    });
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
