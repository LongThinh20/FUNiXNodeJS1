class Methods {
  getSalary = (staff, month) => {
    const workTimes = staff.workTime;
    const offTimes = staff.offTime;
    const salaryScale = staff.salaryScale;

    let overTime = 0;
    let shortTime = 0;
    let salary = 0;
    const listDayLeave = [];

    //get list date leave
    offTimes.forEach((off) => {
      const listOffTime = off.offTime.split(",");
      const timeLeave = off.offHours;
      listOffTime.forEach((date) => {
        if (Number(date.slice(3, 5)) === Number(month)) {
          listDayLeave.push({ date: date, hours: timeLeave });
        }
      });
    });
    //
    //
    //get over Time && short Time
    workTimes.forEach((work) => {
      if (work.endTime.getMonth() + 1 === Number(month)) {
        overTime += work.overTime;
        if (work.total < 8) {
          listDayLeave.forEach((date) => {
            if (
              work.endTime.getDate() === Number(date.date.slice(0, 2)) &&
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

  getTotalTime = (workTime, offTime) => {
    let totalTime = 0;
    let totalTimeLeave = 0;

    offTime.forEach((t) => {
      let numberAnnuaLeave = t.offTime.split(",").length;
      totalTimeLeave += numberAnnuaLeave * t.offHours;
    });
    if (workTime.length) {
      workTime.forEach((t) => {
        totalTime += t.total;
      });
      if (workTime[workTime.length - 1].endTime.getHours() === 24) {
        totalTime += totalTimeLeave;
      }
    }
  };
}

module.exports = new Methods();
