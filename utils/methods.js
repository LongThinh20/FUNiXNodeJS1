class Methods {
  getSalary = (staff, month) => {
    const year = 2021;
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    console.log(lastDayOfMonth);

    const workTime = staff.workTime;
    const offTime = staff.offTime;
    const salaryScale = staff.salaryScale;

    //tìm overtime && shortTime
    let overTime = 0;
    let shortTime = 0;
    const listDayLeave = [];

    //get date leave
    offTime.forEach((off) => {
      const listOffTime = off.offTime.split(",");
      const timeLeave = off.offHours;
      listOffTime.forEach((date) => {
        if (Number(date.slice(3, 5)) === Number(month)) {
          listDayLeave.push({ date: date, hours: timeLeave });
        }
      });
    });

    //get over Time && short Time
    workTime.forEach((work) => {
      if (work.endTime.getMonth() + 1 === Number(month)) {
        overTime += work.overTime;
      }
      listDayLeave.forEach((date) => {
        work.endTime.getDate();
        if (Number(date.date.slice(0, 2)) === work.endTime.getDate()) {
          if (work.total + date.hours < 8) {
            shortTime += 8 - (work.total + date.hours);
          }
        }
      });
    });

    return (salaryScale * 3000000 + (overTime - shortTime) * 200000).toFixed(0);
  };
}

module.exports = new Methods();
