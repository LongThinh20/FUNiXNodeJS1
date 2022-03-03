const Methods = require("../utils/methods");

const moment = require("moment");

let ITEM_PER_PAGE = 5;

exports.getWorkTimeAndSalary = (req, res, next) => {
  let pageSize = ITEM_PER_PAGE || 5;
  let page = +req.query.page || 1;
  let totalItems = +req.staff.workTime.length;
  let totalPage = Math.ceil(totalItems / pageSize);
  let itemsOfPage = req.staff.workTime.slice(
    (page - 1) * pageSize,
    pageSize * page
  );

  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "Thông tin giờ làm và lương",
    moment,
    workTimes: itemsOfPage || req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary,
    currentPage: page,
    hasNextPage: pageSize * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: totalPage
  });
};

exports.postSalaryToMonth = (req, res, next) => {
  let pageSize = ITEM_PER_PAGE;
  let page = +req.query.page || 1;
  let totalItems = +req.staff.workTime.length;
  let totalPage = Math.ceil(totalItems / pageSize);
  let itemsOfPage = req.staff.workTime.slice(
    (page - 1) * pageSize,
    pageSize * page
  );

  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "Thông tin giờ làm và lương",
    moment,
    workTimes: itemsOfPage || req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary,
    currentPage: page,
    hasNextPage: pageSize * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: totalPage
  });
};

exports.getPagination = (req, res, next) => {
  let pageSize = ITEM_PER_PAGE;
  let page = +req.query.page || 1;
  let totalItems = +req.staff.workTime.length;
  let totalPage = Math.ceil(totalItems / pageSize);
  let itemsOfPage = req.staff.workTime.slice(
    (page - 1) * pageSize,
    pageSize * page
  );

  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "Thông tin giờ làm và lương",
    moment,
    workTimes: itemsOfPage || req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary,
    currentPage: page,
    hasNextPage: pageSize * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: totalPage
  });
};

exports.postPagination = (req, res, next) => {
  ITEM_PER_PAGE = req.body.pageSize;
  let pageSize = ITEM_PER_PAGE;
  let page = +req.query.page || 1;
  let totalItems = +req.staff.workTime.length;
  let totalPage = Math.ceil(totalItems / pageSize);
  let itemsOfPage = req.staff.workTime.slice(
    (page - 1) * pageSize,
    pageSize * page
  );

  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "Thông tin giờ làm và lương",
    moment,
    workTimes: itemsOfPage || req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary,
    currentPage: page,
    hasNextPage: pageSize * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: totalPage
  });
};
