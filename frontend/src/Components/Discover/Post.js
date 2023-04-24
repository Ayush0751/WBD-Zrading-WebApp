import React,{useState,useEffect} from "react";
import styles from "../../Assets/css/Discover/Feed.module.css";
import axios from "axios";

function Post(props) {
  const [flag, setflag] = useState(false)
  const {setdelflag} = props;
  const  handleDeletePost = async(id)=>{
    console.log("in delete props for delete ",setdelflag);
    console.log("id is",id);
    // const pid = props.postId;
    try{
      const pst = await (axios.delete("http://localhost:8081/api/users/deletePost/"+id));
        console.log("sdf");
        console.log(pst);
        alert('Post Deleted Successfully')
        setflag(true);
        setdelflag(true);
    }
    catch(error) {
      console.error("errorfsfsf");
      console.error(error);
      // alert(error)
    }
    
  }

  const handleGetPost = async( )=>{
    const pst = await axios.get(
      "http://localhost:8081/api/users/getPost");
      console.log("sdf");
      console.log(pst);
    if (pst.length === 0) {
      
      console.log("No post!");
      // return 0;
    } else {
      console.log("Post fetched successful!");
    }
    setflag(false);
    
  }
  useEffect(() => {
    handleGetPost()    
  }, [flag])

  
  return (
    <>
    <div className={styles["recentPosts"] } style={{backgroundColor:'white'}}>
      <div className={styles["postTop"]}>
        <div className={styles["trdrDp"]}>
          <img
            src={require("../../Assets/images/Navbar/defaultDP.png")}
            alt=""
          />
        </div>
        <div className={styles["authName"]}>
          <h4>{props.postCreatorName} </h4>
          <p>
            <em>{props.timeOfPost}</em>
          </p>
        </div>
      </div>
      <div className={styles["postDetails"]}>
        <div className={styles["postHeading"]}>
          <p>{props.postText} </p>
        </div>
        <div className={styles["postImage"]}>
        <img
            src={props.postImage}
            alt=""
          />
          {/* <img
                  src={require("../../Assets/images/Discover/platinumBg.jpg")}
                  alt=""
                /> */}
        </div>
        <div className={styles["react"]}>
          <div className={styles["icon"]}>
            <i className={"far fa-thumbs-up"}></i>
            <span> Like</span>
          </div>
          <div className={styles["icon"]}>
            <i class="far fa-comment"></i>
            <span> Comment</span>
          </div>
          <div className={styles["icon"]}>
            <i class="fa fa-remove" ></i>
            <span onClick={() => {
                              handleDeletePost(props.postId);
                            }}> Delete</span>
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Post;
