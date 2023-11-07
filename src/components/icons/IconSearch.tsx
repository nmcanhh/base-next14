import { ISvg } from "@/interfaces/common";

export const IconSearch: React.FC<ISvg> = (props) => {
  const { fill = "none", width = 18, height = 18 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      {...props}
    >
      <path
        stroke="#595959"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="m15 12.766 1.537 1.537a1.58 1.58 0 1 1-2.234 2.234L12.766 15M1 7.8a6.8 6.8 0 1 1 13.6 0A6.8 6.8 0 0 1 1 7.8Z"
      />
    </svg>
  );
};
