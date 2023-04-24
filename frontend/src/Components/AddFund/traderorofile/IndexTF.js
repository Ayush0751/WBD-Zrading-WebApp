/* eslint-disable */
import React, { useState } from "react";
import { Sidenav } from "../../Navbar/Sidenav";
import "./IndexTF.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/react-fontawesome";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Feed from "../../Discover/Feed";
import TraderPort from "./TraderPort";
import StatsTr from "./StatsTr";
import TraderFeed from "./TraderFeed";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function IndexTF(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Sidenav />
      <div className="container10">
        <div className="traderWall"></div>
        <div className="supCont">
          <div className="profileCard0">
            <div className="profilePic0">
              <img src={require("../../../Assets/images/rakesh.jpg")} alt="" />
              {/* <span>4 ⭐</span> */}
            </div>
            <div
              className="traderDet"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p
                className="tname"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Baloo Bhai 2",
                  fontSize: "22px",
                  width: "max-content",
                }}
              >
                Rakesh Jhunjhunwala{" "}
                <span style={{ left: "20px", position: "relative" }}>4⭐</span>
              </p>
              <p className="tbio">CEO / Co-Founder / Trader</p>
            </div>
            <div className="traderBtns">
              <button className="tdbtn">Copy</button>
              <button className="tdbtn">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container20">
          <div className="leftCont0" style={{ overflow: "hidden" }}>
            <div className="tTabs" style={{ overflow: "hidden" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Feed" {...a11yProps(0)} />
                  <Tab label="Stats" {...a11yProps(1)} />
                  <Tab label="Portfolio" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="tFeed0">
                  {/* here is the feed */}
                  <TraderFeed  />
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <StatsTr />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TraderPort />
              </TabPanel>
            </div>
          </div>
          <div className="rightCont">
            <div className="profileInfo">
              <div className="biosec0">
                <p>Profile Information</p>
                <div className="tbio0">
                  He began investing in 1985 with a capital of ₹5,000, with his
                  first major profit in 1986. At the time of his death he had an
                  estimated net worth of US$5.8 billion, making him the 438th
                  richest person in the world.
                </div>
              </div>
              <div className="tname0">
                <p>Trading ID:</p>
                <span>Rakesh.JH</span>
              </div>
              <div className="temail0">
                <p>Email:</p>
                <span>rakeshjhunjhun@gmail.com</span>
              </div>
              <div className="tloc0">
                <p>Location:</p>
                <span>MUMBAI, IND</span>
              </div>
              <div className="tsocial0">
                <p>Social:</p>
                <span>
                  <TwitterIcon
                    style={{
                      color: "#0095eb",
                      bottom: "2px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  />
                </span>
                <span>
                  <FacebookIcon
                    style={{
                      color: "blue",
                      margin: "0px 5px 0px 5px",
                      bottom: "2px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  />
                </span>
                <span>
                  <InstagramIcon
                    style={{
                      color: "#922037",
                      bottom: "2px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexTF;
