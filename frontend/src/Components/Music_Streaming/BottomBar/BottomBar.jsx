import React from "react";
import "./BottomBar.css";
import { IoShuffleOutline } from "react-icons/io5";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { IoPauseCircleSharp } from "react-icons/io5";
// import { IoIosPlayCircle } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="bottom-bar-left">aa</div>
      <div className="bottom-bar-center">
        <div className="bottomBarscontrols">
          <div className="bottomBarscontrols-left">
            <IoShuffleOutline />
          </div>
          <div className="bottomBarscontrols-center">
            <BiSolidSkipPreviousCircle />
            <IoPauseCircleSharp fontSize={"50px"}/>
            <BiSolidSkipNextCircle />
          </div>
          <div className="bottomBarscontrols-right">
            {/* <IoIosPlayCircle /> */}
            <IoMdRepeat />
          </div>
        </div>
      </div>
      <div className="bottom-bar-right">aa</div>
    </div>
  );
};

export default BottomBar;
