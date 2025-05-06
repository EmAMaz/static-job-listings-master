import { useContext } from "react";
import { CardContext } from "../context/cardContext";

type Props = {
  company: string;
  logo: string;
  new?: boolean;
  featured?: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages?: string[];
  tools?: string[];
};

const Card = (props: Props) => {
  const { addFilter } = useContext(CardContext);

  const handleFilter = (arg: string) => {
      addFilter(arg);
  }

  return (
    <div
      className={`flex flex-col md:flex-row p-4 gap-4 bg-white justify-between shadow-xl w-full lg:w-4xl rounded-md ${
        props.featured && props.new
          ? "border-solid border-l-5 borderPrimary"
          : ""
      }`}
    >
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <div className="h-22 w-22"><img className="h-22 w-22" src={props.logo} alt={props.company} /></div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="font-bold textPrimary">{props.company}</span>
            <span
              className={
                props.new
                  ? "rounded-xl p-1 px-1.5 font-bold text-white bgPrimary text-sm customText"
                  : "hidden"
              }
            >
              NEW!
            </span>
            <span
              className={
                props.featured
                  ? "rounded-xl p-1 px-1.5 font-bold text-white bgSecondary text-sm customText"
                  : "hidden"
              }
            >
              FEATURED
            </span>
          </div>
          <span className="font-bold text-xl cursor-pointer">{props.position}</span>
          <div className="">
            <span className="after:content-['•'] after:mx-2 textSecondary font-medium">
              {props.postedAt}
            </span>
            <span className="after:content-['•'] after:mx-2 textSecondary font-medium">
              {props.contract}
            </span>
            <span className="textSecondary font-medium">{props.location}</span>
          </div>
        </div>
      </div>
      <div className="md:hidden h-[0.4px] w-full bg-gray-300"></div>
      <div className="flex flex-wrap md:justify-end items-center gap-3">
        <span className="p-1 px-2 font-bold text-sm textPrimary bgPrimaryLight cursor-pointer hover:rotate-[-5deg] transition-all duration-300 ease-in-out" onClick={() => handleFilter(props.role)}>
          {props.role}
        </span>
        <span className="p-1 px-2 font-bold text-sm textPrimary bgPrimaryLight cursor-pointer hover:rotate-[-5deg] transition-all duration-300 ease-in-out" onClick={() => handleFilter(props.level)}>
          {props.level}
        </span>
        {props.languages &&
          props.languages?.map((item, index) => (
            <span key={index} className="p-1 px-2 font-bold text-sm textPrimary bgPrimaryLight cursor-pointer hover:rotate-[-5deg] transition-all duration-300 ease-in-out" onClick={() => handleFilter(item)}>
              {item}
            </span>
          ))}
          {props.tools &&
          props.tools?.map((item, index) => (
            <span key={index} className="p-1 px-2 font-bold text-sm textPrimary bgPrimaryLight cursor-pointer hover:rotate-[-5deg] transition-all duration-300 ease-in-out" onClick={() => handleFilter(item)}>
              {item}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Card;
