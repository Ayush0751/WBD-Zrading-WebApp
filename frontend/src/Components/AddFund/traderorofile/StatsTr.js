/* eslint-disable */
import React, { useState } from "react";
import { UserData } from "./data";
import TraderChart from "./TraderChart";
// import { makeStyles } from "@mui/styles";
import { Divider } from "@mui/material";
import classes from "./StatsTr.module.css"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import MovingIcon from "@mui/icons-material/Moving";
import HowToRegIcon from "@mui/icons-material/HowToReg";
// const useSTyle = makeStyles((theme) => ({
//   tt0: {
//     width: "11em",
//     height: "11em",
//     // boxShadow:" 0px 0px 21px rgba(7, 0, 2, 0.3)",
//     // borderRadius:"12px"
//     alignItems: "flex-start",
//     display: "flex",
//     justifycontent: "center",
//     flexDirection: "column",
//     position: "relative",
//     left: "1em"
//   },
//   title10: {
//     borderRight: "1px solid grey",
//   },
//   title20: {
//     borderRight: "1px solid grey",
//   },
//   title30: {
//     borderRight: "1px solid grey",
//   },
// }));
function StatsTr(props) {
    const {items}=props;
  // const classes = useSTyle();
  const [userData, setUserData] = useState({
    lavel: "Trade date:",
    labels: UserData.map((temp) => temp.TradeDate),
    // labels: ['red','blue'],
    datasets: [
      {
        label: "Return in %",
        data: UserData.map((data) => data.gain),
        borderColor: "red",
        // data: [22,14],
      },
    ],
    options: [
      {
        responsive: true,
        scales: {
          y: {
            ticks: { color: "green", beginAtZero: true },
          },
          x: {
            ticks: { color: "red", beginAtZero: true },
          },
        },
      },
    ],
    width: "30%",
  });
  return (
    <div>
      <TraderChart chartData={userData} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "35px",
        }}
      >
        <div className={`${classes.title10} ${classes.tt0}`}>
          <CalendarMonthIcon style={{ fontSize: "7em" }} />
          <h3 style={{position:"relative",left:"35px"}} >3.5</h3>
          <h5 style={{ right: "21px", position: "relative", bottom: "14px", fontSize:"18px" }}>
            Trades Per Week
          </h5>
        </div>

        <div className={`${classes.title20} ${classes.tt0}`}>
          <SocialDistanceIcon style={{ fontSize: "7em" }} />
          <h3 style={{position:"relative",left:"35px"}} >{items.copiers}</h3>
          <h5 style={{ right: "21px", position: "relative", bottom: "14px",fontSize:"18px"  }}>
            Copiers Last month
          </h5>
        </div>
        <div className={`${classes.title30} ${classes.tt0}`}>
          <MovingIcon style={{ fontSize: "7em" }} />
          <h3 style={{position:"relative",left:"35px"}} >46.4%</h3>
          <h5 style={{ right: "0px", position: "relative", bottom: "14px",fontSize:"18px"  }}>
            Profitable Weeks
          </h5>
        </div>
        <div className={`${classes.title40} ${classes.tt0}`}>
          <HowToRegIcon style={{ fontSize: "7em" }} />
          <h3 style={{position:"relative",left:"0px"}} >7/12/2013</h3>
          <h5 style={{ right: "0px", position: "relative", bottom: "14px",fontSize:"18px"  }}>
            Active Since
          </h5>
        </div>
      </div>
    </div>
  );
}

export default StatsTr;
