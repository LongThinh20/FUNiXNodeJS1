const moment = require("moment");

class Methods {
  //get total time work
  getTotalWorkTime = (startTime, endTime) => {
    let end = moment(endTime);
    let start = moment(startTime);
    let duration = moment.duration(end.diff(start));
    let times = duration.asHours();
    return times;
  };

  //get salary
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
        let total = this.getTotalWorkTime(work.startTime, work.endTime);
        if (total > 8) {
          overTime += total - 8;
        }
        if (total < 8) {
          listDayLeave.forEach((date) => {
            if (
              Number(date.date.slice(0, 2) === work.endTime.getDate()) &&
              date.hours + total <= 8
            ) {
              shortTime += 8 - (date.hours + total);
            }
          });
          shortTime += 8 - total;
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
  getTotalTimeLastDate = (workTimes, offTimes) => {
    const listDayLeave = [];
    let totalWorkTime = 0;
    let timeLeaveOfWorkTime = 0;
    let total = 0;

    //get list leave date
    if (offTimes.length > 0) {
      offTimes.forEach((off) => {
        const listOffTime = off.offTime.split(",");

        let timeLeave = off.offHours;

        listOffTime.forEach((date) => {
          listDayLeave.push({ date: date, hours: timeLeave });
        });
      });
    }

    for (let i = 0; i < workTimes.length - 1; i++) {
      total += this.getTotalWorkTime(
        workTimes[i].startTime,
        workTimes[i].endTime
      );
      if (
        workTimes[i].endTime.getDate() !== workTimes[i + 1].endTime.getDate()
      ) {
        let dateOfLastWorkTime = workTimes[i].endTime.getDate();
        let monthOfLastWorkTime = workTimes[i].endTime.getMonth() + 1;

        listDayLeave.forEach((date) => {
          if (
            Number(date.date.slice(0, 2)) == dateOfLastWorkTime &&
            Number(date.date.slice(3, 5)) == monthOfLastWorkTime
          ) {
            total += date.hours;
          }
        });
      }
    }
    let time = this.getTotalWorkTime(
      workTimes[workTimes.length - 1].startTime,
      workTimes[workTimes.length - 1].endTime
    );
    return total + time;

    //
    // let totalTime = 0;
    // let totalTimeLeave = 0;
    // const listDayLeave = [];
    // const workTimesToday = [];
    // //get leave date of today
    // if (offTimes.length > 0) {
    //   offTimes.forEach((off) => {
    //     const listOffTime = off.offTime.split(",");
    //     let timeLeave = off.offHours;
    //     listOffTime.forEach((date) => {
    //       if (
    //         Number(date.slice(3, 5)) === today.getMonth() &&
    //         Number(date.slice(0, 2)) === today.getDate()
    //       ) {
    //         listDayLeave.push({ date: date, hours: timeLeave });
    //       }
    //     });
    //   });
    //   listDayLeave.forEach((date) => {
    //     return (totalTimeLeave += date.hours);
    //   });
    // }
    // //get list work time today
    // if (workTimes.length > 0) {
    //   const workTimesToday = workTimes.filter(
    //     (t) =>
    //       t.startTime.getDate() === today.getDate() &&
    //       t.startTime.getMonth() === today.getMonth()
    //   );
    //   if (workTimesToday.length > 0) {
    //     workTimesToday.forEach((t) => {
    //       let total = this.getTotalWorkTime(t.startTime, t.endTime);
    //       totalTime += total;
    //     });
    //     //condition find workTime last day
    //     if (
    //       workTimesToday[workTimesToday.length - 1].endTime.getHours() === 24
    //     ) {
    //       totalTime += totalTimeLeave;
    //     }
    //   }
    //   return { totalTime, workTimesToday };
    // }
    // return { totalTime, workTimesToday };
  };

  getTotalTimes = (workTime) => {
    let totalTime = 0;
    if (workTime.length) {
      workTime.forEach((t) => {
        let total = this.getTotalWorkTime(t.startTime, t.endTime);
        totalTime += total;
      });
    }
    return totalTime;
  };
}

module.exports = new Methods();
