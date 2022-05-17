import * as dayjs from 'dayjs';

const transformTime = (time: number) => {
  return dayjs(+time).format('YYYY年MM月DD日 HH时mm分');
}

export { transformTime };
