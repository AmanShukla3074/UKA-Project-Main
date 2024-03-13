import React, { useContext } from "react";
import "./SIdebar.css";
import { IoMdMusicalNotes } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { PiPlaylistFill } from "react-icons/pi";
import { RiAlbumFill } from "react-icons/ri";
import { TbMusicCheck } from "react-icons/tb";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const SIdebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="SidebarContainer">
      <Link className="SideBarLink" to="">
        <div className="home sideBarFlex">
          <div className="sideBarLogo">
            <IoMdHome />
          </div>
          <span className="sideBarText">Home</span>
        </div>
      </Link>
      
      <Link to="/musicstreaming/search" className="SideBarLink">
      <div className="home sideBarFlex">
        <div className="sideBarLogo">
          <FaSearch />
        </div>
        <span className="sideBarText">Search</span>
      </div>
      </Link>
      <Link to="/musicstreaming/playlist" className="SideBarLink">
        <div className="home sideBarFlex">
          <div className="sideBarLogo">
            <PiPlaylistFill />
          </div>
          <span className="sideBarText">Playlist</span>
        </div>
      </Link>

      {user ? (
        <>


        <br/>
          <Link to="/musicstreaming/add-music" className="SideBarLink">
            <div className="home sideBarFlex">
              <div className="sideBarLogo">
                <IoMdMusicalNotes />
              </div>
              <span className="sideBarText">Add Music</span>
            </div>
          </Link>
          <Link to="/musicstreaming/add-album" className="SideBarLink">
            <div className="home sideBarFlex">
              <div className="sideBarLogo">
                < RiAlbumFill/>
              </div>
              <span className="sideBarText">Add Album</span>
            </div>
          </Link>
          <Link to="/musicstreaming/mymusic" className="SideBarLink">
            <div className="home sideBarFlex">
              <div className="sideBarLogo">
                < TbMusicCheck/>
              </div>
              <span className="sideBarText">My Music</span>
            </div>
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SIdebar;
