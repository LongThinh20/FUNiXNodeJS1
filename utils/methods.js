const staff = require("../models/staff");

class Methods {
  getSalary = (staff, month) => {
    const workTimes = staff.workTime;
    const offTimes = staff.offTime;
    const salaryScale = staff.salaryScale;

    let overTime = 0;
    let shortTime = 0;
    let salary = 0;
    const listDayLeave = [];

    //get list annual leave by month
    offTimes.forEach((off) => {
      const listOffTimes = off.offTime.split(",");
      const timeLeave = off.offHours;
      listOffTimes.forEach((date) => {
        if (Number(date.slice(3, 5)) === Number(month)) {
          listDayLeave.push({ date: date, hours: timeLeave });
        }
      });
    });
    //
    //get over Time && short Time
    workTimes.forEach((work) => {
      if (work.endTime.getMonth() + 1 === Number(month)) {
        overTime += work.overTime;
        if (work.total < 8) {
          listDayLeave.forEach((date) => {
            if (
              Number(date.date.slice(0, 2) === work.endTime.getDate()) &&
              date.hours + work.total <= 8
            ) {
              shortTime += 8 - (date.hours + work.total);
            }
          });
          shortTime += 8 - work.total;
        }
      }
    });

    if (month) {
      salary = (
        salaryScale * 3000000 +
        (overTime - shortTime) * 200000
      ).toFixed(0);
    }

    return salary;
  };

  getTotalTimeLastDate = (staff) => {
    const today = new Date();
    let totalTime = 0;
    let totalTimeLeave = 0;
    const listDayLeave = [];
    const workTimesToday = [];

    //get leave date of today
    if (staff.offTime.length > 0) {
      staff.offTime.forEach((off) => {
        const listOffTime = off.offTime.split(",");
        let timeLeave = off.offHours;
        listOffTime.forEach((date) => {
          if (
            Number(date.slice(3, 5)) === today.getMonth() &&
            Number(date.slice(0, 2)) === today.getDate()
          ) {
            listDayLeave.push({ date: date, hours: timeLeave });
          }
        });
      });
      listDayLeave.forEach((date) => {
        return (totalTimeLeave += date.hours);
      });
    }
    //
    //get list work time today
    if (staff.workTime.length > 0) {
      const workTimesToday = staff.workTime.filter(
        (t) =>
          t.startTime.getDate() === today.getDate() &&
          t.startTime.getMonth() === today.getMonth()
      );
      if (workTimesToday.length > 0) {
        workTimesToday.forEach((t) => {
          totalTime += t.total;
        });
        //condition find workTime last day
        if (
          workTimesToday[workTimesToday.length - 1].endTime.getHours() === 24
        ) {
          totalTime += totalTimeLeave;
        }
      }

      return { totalTime, workTimesToday };
    }
    return { totalTime, workTimesToday };
  };

  getTotalTime = (workTime) => {
    let totalTime = 0;
    if (workTime.length) {
      workTime.forEach((t) => {
        totalTime += t.total;
      });
    }
    return totalTime;
  };
}

module.exports = new Methods();
