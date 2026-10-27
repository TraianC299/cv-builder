import COLORS from "@/constants/COLORS";
type Props = {
  name: string;
  picture: string;
  [x: string]: any;
};


const Avatar = ({ name, picture, ...props }: Props) => {
  return (
    <div className="flex items-center" {...props}>
      <img
        style={{ objectFit: "cover" }}
        src={picture}
        className="rounded-full mr-4 w-8 h-8 rounded-full"
        alt={name}
      />
      <div className="text-base font-light" style={{ color: COLORS.BLACKGREY }}>
        {name}
      </div>
    </div>
  );
};

export default Avatar;
