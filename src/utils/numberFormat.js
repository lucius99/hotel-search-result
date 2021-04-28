import numbro from 'numbro';

const starsFormat = number => {
  return numbro(number).format({
    spaceSeparated: false,
    average: true,
    mantissa: 1,
  });
};

const distanceRound = number => {
  return Math.round(number * 10) / 10;
};

const numberFormat ={
  starsFormat,
    distanceRound,
}

export default numberFormat;
