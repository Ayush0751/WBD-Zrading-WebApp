import React, { useState, useEffect, useRef } from "react";
import styles from "../../Assets/css/Discover/Feed.module.css";
import Post from "./Post";
import Copiers from "./Copiers";
import Traders from "./Traders";
import Navbar from "../Navbar/Navbar";
import { TextField } from "@mui/material";
import { Audio ,ColorRing} from "react-loader-spinner";
import Loader from "rsuite/Loader";
import axios from "axios";

function Feed(props) {
  const fileRef = useRef(null);
  const [newPost, setnewPost] = useState("");
  const [flag, setflag] = useState(false);
  const [deleteflag, setdeleteflag] = useState(false);
  const [loader, setloader] = useState(true);
  const handlePost = (e) => {
    setnewPost(e.target.value);
    // e.target.value = "";
    // console.log(newPost);
  };
  let [loadingState, setLoadingState] = useState(false);
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    const formdata = new FormData();
    formdata.append("postText", newPost);
    // formdata.append("postImage", postImage);
    formdata.append("file", fileRef.current.files[0]);
    formdata.append("postImageName", postImageName);
    console.log(postImage);
    console.log(formdata);

    setloader(true);
    setTimeout(() => {
      console.log("20000000000000000");
      setflag(true);
      setloader(false);
    }, 4000);
    // if(flag===false){

    // }

    // setflag(true);
    console.log("flag is ", flag);
    const pst = await axios.post(
      "https://zrading-backend.onrender.com/api/users/uploadPost",
      // {
      // postText: newPost
      formdata
      // }
    );

    if (pst.length === 0) {
      console.log("Post failed!");
      // return 0;
    } else {
      console.log("Post successful!");
      // const history =useHistory();
      setLoadingState(false);
      // Navigate("/discover")
    }
  };
  const [postdata, setPostdata] = useState("");

  const handleGetPost = async () => {
    const pst = await axios.get("https://zrading-backend.onrender.com/api/users/getPost");
    console.log("sdf");
    console.log(pst);
    if (pst.length === 0) {
      console.log("No post!");
      // return 0;
    } else {
      console.log("Post fetched successful!");
      // const history =useHistory();
      // setLoadingState(false);
      // Navigate("/discover")
    }
    setflag(false);
    setloader(false);
    setPostdata(pst.data.result);

    setnewPost("");
    setpostImageName("");
    setpostImage("");
  };

  useEffect(() => {
    // let pp;
    handleGetPost();
    console.log("flag issssssss", flag);
    setloader(false);
    // setflag(false);
  }, [flag]);
  console.log({ postdata: postdata });

  useEffect(() => {
    setLoadingState(false);
  }, [postdata]);

  const calculateTime = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();

    const timeDiff = Math.abs(currentDate.getTime() - createdAtDate.getTime()); // in milliseconds

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    let str;
    if (minutes == 0 && hours == 0) {
      return `${seconds} seconds ago`;
    } else if (hours == 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${hours} hours ago`;
    }
    // return `created ${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
  };
  const [postImage, setpostImage] = useState("");
  const [postImageName, setpostImageName] = useState("");
  const handleImageChange = (e) => {
    setpostImage(e.target.files[0]);
    setpostImageName(e.target.files[0].name);
  };

  return (
    <>
      <Navbar />
      <div className={styles["feedOuterContainer"]}>
        <div className={styles["feedInner"]}>
          <div className={styles["post"]}>
            <div className={styles["postTop"]}>
              <div className={styles["dp"]}>
                <img
                  src={require("../../Assets/images/Navbar/defaultDP.png")}
                  alt=""
                />
              </div>
              <div className={styles["textAr"]}>
                <form action="">
                  {/* <input
                    size="50"
                    type="text"
                    name="post_text"
                    placeholder="What's on your mind"
                    onChange={handlePost}
                  /> */}
                  <TextField
                    id="standard-basic"
                    label="What's on your mind"
                    variant="standard"
                    name="post_text"
                    onChange={handlePost}
                    style={
                      {
                        // width: '19em',
                        // position: 'relative',
                        // right: '2em',
                        // height: '27px',
                        // fontSize: '1.2rem'
                      }
                    } 
                  />
                  <br />
                  <input
                    type="file"
                    name="myImage"
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                  <br />
                  <div className={styles.postBtn}>
                    <button onClick={handlePostSubmit}>Post</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {loadingState && (
            <div
              style={{
                width: "200px",
                height: "44px",
                position: "relative",
                left: "22em",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                top: "1em"
                // backgroundColor: "black",
              }}
            >
              {/* <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              /> */}
              <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#0095eb", "#0095eb", "#0095eb", "#abbd81", "#0095eb"]}
              /> Loading...
            </div>
          )}
          <div className={styles["recentPosts"]} style={{ color: "black" }}>
            {console.log("fsdddddddddd", postdata.length)}
            {postdata?.length > 0 &&
              postdata.map((item, index) => {
                console.log("index is", index);
                return (
                  <Post
                    postCreatorName="Ayush Raj"
                    timeOfPost={calculateTime(item.createdAt)}
                    postText={item.postText}
                    postImage={item.postImage}
                    postId={item._id}
                    setdelflag={setflag}
                  />
                );
              })}
            {/* <Post postCreatorName = "Ayush Raj" timeOfPost="5 hrs ago" postText="Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year  " postImage = "platinumBg.jpg"/>
            <Post postCreatorName = "Ayush Dingla" timeOfPost="4 hrs ago" postText="Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year  " postImage = "goldBg.jpg"/>
            <Post postCreatorName = "Praveen Raj" timeOfPost="10 hrs ago" postText="Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealttyfyf fhjgjd hgdhw wge hevhr the year  " postImage = "platinumBg.jpg"/>
            <Post postCreatorName = "Sanu Khan" timeOfPost="23 hrs ago" postText="Bitcoin’s stealdehbb hbbed fbefe hbfhrf ewn fosses for the year  " postImage = "goldBg.jpg"/> */}
          </div>
        </div>

        <div className={styles["otherList"]}>
          <div className={styles["card1"]}>
            <h2>Top traders of the week</h2>
            <Copiers copierName="Dingla(Org)" copierProfit="+50%" />
            <Copiers copierName="Singla Dingla" copierProfit="-70%" />
            <Copiers copierName="Sanu Dingla" copierProfit="+1%" />
          </div>
          <div className={styles["card2"]}>
            <h2>Top Traders of the week</h2>
            <Traders traderName="Dingla(Org)" traderProfit="+50%" />
            <Traders traderName="Singla Dingla" traderProfit="-70%" />
            <Traders traderName="Sanu Dingla" traderProfit="+1%" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
