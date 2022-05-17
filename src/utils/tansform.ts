export const transFormType = number => {
  let type: string = '';
  switch (number) {
    case 1:
      type = '个人动态';
      break;
    case 2:
      type = '失物招领';
      break;
    case 3:
      type = '有偿悬赏';
      break;
    case 4:
      type = '二手交易';
      break;
    case 5:
      type = '校内拼车';
      break;
  }
  return type;
};
