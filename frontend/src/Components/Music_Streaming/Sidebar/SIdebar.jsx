import React, { useContext, useState } from "react";
import "./SIdebar.css";
import { IoMdMusicalNotes } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { PiPlaylistFill } from "react-icons/pi";
import { RiAlbumFill } from "react-icons/ri";
import { TbMusicCheck } from "react-icons/tb";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import CreatePlaylistModal from "../Modals/CreatePlaylistModal/CreatePlaylistModal";

const SIdebar = () => {
  const { user } = useContext(AuthContext);
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);

  return (
    <div className="SidebarContainer">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}

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
      {/* <Link to="/musicstreaming/playlist" className="SideBarLink"> */}

      {/* </Link> */}

      {user ? (
        <>
          {/* {" "} */}
          <div
            className="home sideBarFlex"
            onClick={() => {
              setCreatePlaylistModalOpen(true);
            }}
          >
            <div className="sideBarLogo">
              <PiPlaylistFill />
            </div>
            <span className="sideBarText">Create Playlist</span>
          </div>
          <br />
          <Link to="/musicstreaming/add-music" className="SideBarLink">
            <div className="home sideBarFlex">
              <div className="sideBarLogo">
                <IoMdMusicalNotes />
              </div>
              <span className="sideBarText">Add Music</span>
            </div>
          </Link>
          {/* <Link to="/musicstreaming/add-album" className="SideBarLink">
            <div className="home sideBarFlex">
              <div className="sideBarLogo">
                <RiAlbumFill />
              </div>
              <span className="sideBarText">Add Album</span>
            </div>
          </Link> */}
          <Link to="/musicstreaming/mymusic" className="SideBarLink">
            <div className="home sideBarFlex">
              <div className="sideBarLogo">
                <TbMusicCheck />
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
