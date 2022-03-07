const items = ["Banana", "Apple", "Melon"];

const filterBy = (str) =>
  items.filter((item) =>
    new RegExp("^" + str.replace(/\*/g, ".*") + "$").test(item)
  );
console.log(filterBy("e"));
console.log(filterBy("*e"));
console.log(filterBy("*e*"));
console.log(filterBy("ana"));
console.log(filterBy("*ana"));
console.log(filterBy("*an"));
console.log(filterBy("*an*"));
