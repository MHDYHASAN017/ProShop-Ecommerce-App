import React from "react";
import { BsStarFill, BsStarHalf , BsStar } from "react-icons/bs";

const Rating = ({ value, text, color }) => {
  return (
    <>
      <div className="flex space-x-1 mb-1">
        <span>
          {value >= 1 ? (
            <BsStarFill />
          ) : value >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <BsStarFill />
          ) : value >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <BsStarFill />
          ) : value >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar/>
          )}
        </span>
        <span>
          {value >= 4 ? (
            <BsStarFill />
          ) : value >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <BsStarFill />
          ) : value >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      </div>
      <div>
        <span>{text && text}</span>
      </div>
    </>
  );
};

export default Rating;
