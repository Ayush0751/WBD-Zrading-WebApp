/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styles from './TraderFeed.module.css'
import Post from '../../Discover/Post'
import Copiers from '../../Discover/Copiers'
import Traders from '../../Discover/Traders'
import { TextField } from '@mui/material'
import axios from 'axios'
import Navbar from '../../Navbar/Navbar'
// import Navbar from '../Navbar/Navbar'
// import { TextField } from 'react-admin'

function TraderFeed (props) {
  const { sideBarShow } = props

  console.log(sideBarShow,"sideBarShow");
  const [newPost, setnewPost] = useState('')
  const [flag, setflag] = useState(false)
  const handlePost = (e) => {
    setnewPost(e.target.value)
    // e.target.value = "";
    // console.log(newPost);
  }
  const handlePostSubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('postText', newPost)
    formdata.append('postImage', postImage)
    formdata.append('postImageName', postImageName)
    console.log(postImage)
    console.log(formdata)
    setflag(true)
    const pst = await axios.post(
      'http://localhost:8081/api/users/uploadPost',
      // {
      // postText: newPost
      formdata
      // }
    )
    if (pst.length === 0) {
      console.log('Post failed!')
      // return 0;
    } else {
      console.log('Post successful!')
      // const history =useHistory();
      // setLoadingState(false)
      // Navigate("/discover")
    }
  }
  const [postdata, setPostdata] = useState('')
  const handleGetPost = async () => {
    const pst = await axios.get(
      'http://localhost:8081/api/users/getPost')
    console.log('sdf')
    console.log(pst)
    if (pst.length === 0) {
      console.log('No post!')
      // return 0;
    } else {
      console.log('Post fetched successful!')
      // const history =useHistory();
      // setLoadingState(false);
      // Navigate("/discover")
    }
    setflag(false)
    setPostdata(pst.data.result)

    setnewPost('')
    setpostImageName('')
    setpostImage('')
  }

  useEffect(() => {
    // let pp;
    handleGetPost()
    // setflag(false);
  }, [flag])
  console.log({ postdata })

  const calculateTime = (createdAt) => {
    const createdAtDate = new Date(createdAt)
    const currentDate = new Date()

    const timeDiff = Math.abs(currentDate.getTime() - createdAtDate.getTime()) // in milliseconds

    const seconds = Math.floor(timeDiff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (minutes === 0 && hours === 0) {
      return `${seconds} seconds ago`
    } else if (hours === 0) {
      return `${minutes} minutes ago`
    } else {
      return `${hours} hours ago`
    }
    // return `created ${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
  }
  const [postImage, setpostImage] = useState('')
  const [postImageName, setpostImageName] = useState('')
  const handleImageChange = (e) => {
    setpostImage(e.target.files[0])
    setpostImageName(e.target.files[0].name)
  }

  // const [loadingState, setLoadingState] = useState(false)
  return (
    <>
    <Navbar/>
      <div className={styles.feedOuterContainer}>
        <div className={styles.feedInner}>
          <div className={styles.post}>
            <div className={styles.postTop}>
              <div className={styles.dp}>
                <img
                  src={require('../../../Assets/images//Navbar/defaultDP.png')}
                  alt=""
                />
              </div>
              <div className={styles.textAr}>
                <form action="">
                  {/* <input
                    size="50"
                    type="text"
                    name="post_text"
                    placeholder="What's on your mind"
                    onChange={handlePost}
                  /> */}
                  <TextField id="standard-basic" label="What's on your mind" variant="standard" name="post_text" onChange={handlePost} style={{
                    // width: '19em',
                    // position: 'relative',
                    // right: '2em',
                    // height: '27px',
                    // fontSize: '1.2rem'
                  }}/>
                  <br />
                  <input
                  className={styles.fileInp}
                    type="file"
                    name="myImage"
                    onChange={handleImageChange}
                    style={{ width: '15em', marginTop: '0.6vw', marginBottom: '1vw' }}
                  />
                  <br />
                  <div className={styles.postBtn}>
                    <button onClick={handlePostSubmit}>Post</button>
                  </div>
                </form>
              </div>
            </div>

            {/* <div className={styles['post-bottom']}>
              <div className={styles.action}>
                <i className={'fa fa-image'}></i>
                <span>Photo/Video</span>
              </div>
            </div> */}
          </div>
          <div className={styles.recentPosts} >
          {postdata?.length > 0 &&
                  postdata.map((item, index) => {
                    console.log('index is', index)
                    return (
                      <Post key={item.id} postCreatorName = "Ayush Raj" timeOfPost={calculateTime(item.createdAt)} postText={item.postText} postImage ={item.postImage}/>
                    )
                  })}
            {/* <Post postCreatorName = "Ayush Raj" timeOfPost="5 hrs ago" postText="Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year  " postImage = "platinumBg.jpg"/>
            <Post postCreatorName = "Ayush Dingla" timeOfPost="4 hrs ago" postText="Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealth rally erases its losses for the year  " postImage = "goldBg.jpg"/>
            <Post postCreatorName = "Praveen Raj" timeOfPost="10 hrs ago" postText="Bitcoin’s stealth rally erases its losses for the year Bitcoin’s stealttyfyf fhjgjd hgdhw wge hevhr the year  " postImage = "platinumBg.jpg"/>
            <Post postCreatorName = "Sanu Khan" timeOfPost="23 hrs ago" postText="Bitcoin’s stealdehbb hbbed fbefe hbfhrf ewn fosses for the year  " postImage = "goldBg.jpg"/> */}
          </div>
        </div>

        <div className={styles.otherList} style={{ display: !sideBarShow ? 'none' : 'block'}}>
          <div className={styles.card1}>
            <center>
              <h2 style={{ color: '#0095EB' }}>Top traders of the week</h2>
              <Copiers copierName = "Dingla(Org)" copierProfit="+50%" />
              <Copiers copierName = "Singla Dingla" copierProfit="-70%" />
              <Copiers copierName = "Sanu Dingla" copierProfit="+1%" />
            </center>
          </div>
          <div className={styles.card2} >
            <center>
              <h2 style={{ color: '#0095EB' }}>Top Traders of the week</h2>
              <Traders traderName = "Dingla(Org)" traderProfit="+50%" />
              <Traders traderName = "Singla Dingla" traderProfit="-70%" />
              <Traders traderName = "Sanu Dingla" traderProfit="+1%" />
            </center>
          </div>
        </div>
      </div>
    </>
  )
}

export default TraderFeed
