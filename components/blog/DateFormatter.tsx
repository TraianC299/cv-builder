import { GREY } from "../../data/contants";

type Props = {
  dateString: string
}
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const DateFormatter = ({ dateString }: Props) => {
  return <time className="p" style={{textTransform:"capitalize", color:GREY}} dateTime={dateString}>{new Date(dateString).toLocaleDateString("en", options)}</time>
}

export default DateFormatter