import numbro from "numbro";

const starsFormat = (number) => {
  return numbro(number).format({
    spaceSeparated: false,
    average: true,
    mantissa: 1,
  });
};

const demicalFomat = (number) => {
  return numbro(Math.round(number)).format({
    thousandSeparated: true,
    spaceSeparated: false,
    mantissa: 0,
  });
};

const hundredFormat = (number) => {
  return numbro(Math.round(number / 100) * 100).format({
    thousandSeparated: true,
    spaceSeparated: false,
    mantissa: 0,
  });
};

const numberFormat = {
  starsFormat,
  demicalFomat,
  hundredFormat
};

console.log(demicalFomat(129.99));

export default numberFormat;
