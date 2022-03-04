module.exports = (req, res, next) => {
  if (req.staff.role !== "manager") {
    return res.status(401).redirect("/");
  }
  next();
};
