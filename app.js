const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const errorController = require("./controllers/error");
const Staff = require("./models/staff");

const MONGODB_URI =
  "mongodb+srv://nodejs:nodejs12345@cluster0.wyrbn.mongodb.net/Staffs";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session"
});
const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const staffRoutes = require("./routes/staff");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.staff) {
    return next();
  }

  Staff.findById(req.session.staff._id)
    .then((staff) => {
      if (!staff) {
        return next();
      }
      req.staff = staff;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(authRoutes);
app.use(staffRoutes);
app.use(errorController.get404);

//connect to db
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    Staff.findOne().then((staff) => {
      if (!staff) {
        const staff = new Staff({
          name: "Nguyên Văn A",
          user: "staff",
          password: "staff",
          doB: new Date(1994, 02, 20),
          salaryScale: 1.5,
          startDate: new Date(2022, 02, 02),
          department: "IT",
          annualLeave: 8,
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
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
