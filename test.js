let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
// let page_size = 2;
// let page_number = 2;

// console.log(
//   array.slice((page_number - 1) * page_size, page_size * page_number)
// );

function test(page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_size * page_number);
}

let totalPage = Math.ceil(+array.length / 10);

console.log(totalPage);

console.log(test(10, 2));
