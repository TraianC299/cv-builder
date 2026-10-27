import COLORS from "@/constants/COLORS";

type Props = {
  dateString: string;
  [key: string]: any;
};
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const DateFormatter = ({ dateString, ...props }: Props) => {
  return (
    <time
      {...props}
      style={{ textTransform: "capitalize", color: COLORS.GREY }}
      dateTime={dateString}
    >
      {new Date(dateString).toLocaleDateString("en", options)}
    </time>
  );
};

export default DateFormatter;
