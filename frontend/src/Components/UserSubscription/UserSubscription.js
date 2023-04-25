import React,{useState,useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import SubscribedTradersList from "./SubscribedTradersList";
import SubscribedTraders from "./SubscribedTraders";
import Chat from "./Chat";
import styles from "../../Assets/css/UserSubscription/UserSubscription.module.css";

import axios from "axios";


function UserSubscription() {

  const timeHandler = (date) => {
    var now = new Date(date);
    // var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    // console.log(date + ' ' + time)
    return time;
  };
  const dateHandler2 = (date) => {
    var now = new Date(date);
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    // console.log(date + ' ' + time)
    return (date + ' ' + time);
  };
  const dateHandler = (date) => {
    var now = new Date(date);
    var date = now.toLocaleDateString();
    // var time = now.toLocaleTimeString();
    // console.log(date + ' ' + time)
    return date;
  };
  var trader1 = {
    traderName : "John Smith",
    username: "john69",
    tradingSince: "5th jan 2022",
    membership: "Gold",
    traderImg: "defaultDP.png"
  };
  var trader2 = {
    traderName : "Ayush Singla",
    username: "Dingla420",
    tradingSince: "19th june 2022",
    membership: "Platinum",
    traderImg: "greydp.png"
  };

  const activeTraderProfile = (item)=>{
    console.log("hbk");
    // console.log(event.traderImg);
    setactiveTraderName(item.name);
    setactiveTraderBio(item.bio)
    setactiveTraderId(item.trader_id);
    // setactivetraderImg(item.traderImg);
    setactiveTradermembership(item.membership);
    setactiveTradertradingSince(dateHandler(item.ordertime))
    if(item.membership=="Medium Plan"){
      setbgImage("goldBg.jpg")
      setcol("#FFD700")
      setrgbCol("255,215,0")
    }
    if(item.membership=="Pro Plan"){
      setbgImage("platinumBg.jpg")
      setcol("#E5E4E2")
      setrgbCol("	229, 228, 226")
    }

  }
  const activeTraderProfile2 = (event)=>{
    console.log(event);
    // console.log(event.traderImg);
    // setactiveTraderName(trader2.traderName);
    // setactivetraderImg(trader2.traderImg);
    // setactiveTradermembership(trader2.membership);
    // setactiveTradertradingSince(trader2.tradingSince);
    // if(trader2.membership=="Platinum"){
      // setbgImage("platinumBg.jpg")
      // setcol("#E5E4E2")
      // setrgbCol("	229, 228, 226")
    // }
  }
  // const activeTraderProfile2 = (event)=>{
  //   console.log("hbk");
  //   // console.log(event.traderImg);
  //   setactiveTraderName(trader2.traderName);
  //   setactivetraderImg(trader2.traderImg);
  //   setactiveTradermembership(trader2.membership);
  //   setactiveTradertradingSince(trader2.tradingSince);
  //   if(trader2.membership=="Platinum"){
  //     setbgImage("platinumBg.jpg")
  //     setcol("#E5E4E2")
  //     setrgbCol("	229, 228, 226")
  //   }
  // }
  
  const [subsData,setSubsData]=useState('');
  const handleGetSubs = async( )=>{
    const subs = await axios.get(
      "https://zrading-backend.onrender.com/api/users/getSubscriptions");
      console.log("sdf");
      console.log(subs);
      if (subs.length === 0) {
      
      console.log("No traders subscribed");
      // return 0;
    } else {
      console.log("Post fetched successful!");
    }
    // setflag(false);
    setSubsData(subs.data.result)
    console.log("data is ",subs.data.result[0].name);
    setactiveTraderName(subs.data.result[0].name)
    setactiveTraderBio(subs.data.result[0].bio)
    setactiveTradertradingSince(dateHandler(subs.data.result[0].ordertime))


  }
  
  useEffect(() => {
    // let pp;
    handleGetSubs()
    setTimeout(() => {
      
      }, 3000);
      // setflag(false);
      
    }, [])
    
    
    
    const [activeTraderName, setactiveTraderName] = useState("")
  const [activeTraderBio, setactiveTraderBio] = useState("")
  const [activetraderImg, setactivetraderImg] = useState(trader1.traderImg)
  const [activeTradermembership, setactiveTradermembership] = useState(trader1.membership)
  const [activeTraderId, setactiveTraderId] = useState(trader1.tradingSince)
  const [activeTradertradingSince, setactiveTradertradingSince] = useState(trader1.tradingSince)
  const [bgImage, setbgImage] = useState("goldBg.jpg");
  const [col, setcol] = useState("#FFD700");
  const [rgbCol, setrgbCol] = useState("255,215,0");
  return (
    <>
      <Navbar />
      <div className={styles.tradersListBox}>
        {/* <SubscribedTradersList
          traderImg="defaultDP.png"
          traderProfile="https://www.youtube.com/"
          funcn = {activeTraderProfile}
        />
        <SubscribedTradersList
          traderImg="greydp.png"
          traderProfile="https://www.youtube.com/"
          funcn = {activeTraderProfile2}
        /> */}
       {subsData?.length > 0 &&
                    
                  subsData.map((item, index) => {
                    console.log("index is", index);
                    // console.log("data is", subsData[0].name);
                    return (
                      <div onClick={()=>activeTraderProfile(item)}>
                        <SubscribedTradersList
                        traderImg="greydp.png"
                        // traderProfile="https://www.youtube.com/"
                        traderData = {index}
                        funcn = {activeTraderProfile}
                      />
                      </div>
                    
                      );
          })}


      </div>
      <hr className={styles.sepLine} />

      <div className={styles.openedTrader}>
        {/* <div className={styles.traderInfo} style={{backgroundImage:"url(../../images/".concat(bgImage).concat(")"), backgroundRepeat: 'no-repeat',backgroundSize: "100% 100%",boxShadow: "1px -2px 22px".concat(col)}}> */}
        <div className={styles.traderInfo} style={{backgroundImage: "linear-gradient(to right, rgba(".concat(rgbCol).concat(",0), rgba(").concat(rgbCol).concat(",0.5))")}}>
          <SubscribedTraders traderImg={activetraderImg} traderName = {activeTraderName} tradingSince = {activeTradertradingSince} membership={activeTradermembership} traderBio = {activeTraderBio}/>
          
        </div>

        <div className={styles.line}></div>

        <div className={styles.chatWindow}>
            <Chat traderName = {activeTraderName}/>

        </div>
      </div>
    </>
  );
}

export default UserSubscription;
