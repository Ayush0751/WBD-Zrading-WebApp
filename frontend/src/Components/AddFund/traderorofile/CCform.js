import React, { useState, useEffect, useRef } from "react";
// import Button from "./Button";
import styles1 from "../../../Assets/css/LoginPage.module.css";
import styles2 from "./CCform.module.css";
// import InputField from "./InputField";
// import Slider from "./Slider";
// import CopyOrder from "./Functions/CopyOrder";
// import async from "hbs/lib/async";
import axios from "axios";
import ConfirmForm from "./ConfirmForm";

function CCform(props) {
  const { items } = props;
  //   console.log(name,"hiiiiiiiiiiiiiiiii");
  
  return (
    <>
      <div className={styles2.backGrd}>
        <div className={styles2.window}>
          <ConfirmForm items={items} fun={props.close}/>
          <div>
            {/* <button className={styles1["button"] + " "+styles2["extraBtn"]} onClick={() => {
              setFlag(true)
              handleCopy();
            }} >Copy</button> */}
            <button className={styles2["cancel-button"]} onClick={props.close}>
              Close
            </button>
          </div>
        </div>
      </div>
      {/* {flag && <CopyOrder amount={amt} flag={flag} />} */}
    </>
  );
}

export default CCform;
