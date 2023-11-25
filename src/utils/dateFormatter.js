import { dayjs } from 'element-plus'

export const dateFormatter = (row) => {
  return dayjs(row.pub_date).format('YYYY年MM月DD日')
}
