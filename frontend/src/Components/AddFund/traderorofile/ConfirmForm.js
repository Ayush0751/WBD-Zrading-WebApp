import { useEffect, useRef, useState } from "react";
import "./ConfirmForm.css";
import axios from "axios";
function CardDescription({ title, description }) {
  return (
    <div className="card-description">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function CardBilling({ price, recurrency }) {
  return (
    <div className="card-billing">
      <p>
        <strong className="price">$ {price}</strong>
        <strong> / mo.</strong>
      </p>
      <p>
        <span className="recurrency">
          Billed Anually or $ {recurrency}/monthly
        </span>
      </p>
    </div>
  );
}

function CardFeatures({ data }) {
  return (
    <div className="card-features">
      <ul>
        {data.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

function CardAction({ clickMe }) {
  return (
    <div className="card-action">
      <button onClick={clickMe}>BUY NOW</button>
    </div>
  );
}

function PricingCard(props) {
  const {
    type,
    title,
    description,
    price,
    recurrency,
    mostPopular,
    data,
    clickMe,
  } = props;

  return (
    <div className={`card pricing-card ${type}`}>
      {mostPopular ? <span className="most-popular">Most Popular</span> : null}
      <CardDescription title={title} description={description} />
      <CardBilling price={price} recurrency={recurrency} />
      <CardFeatures data={data} />
      <CardAction clickMe={clickMe} />
    </div>
  );
}

export default function ConfirmForm(props) {
  const { items } = props;
  const [amt, setAmt] = useState("0");
  const updateVal = (event) => {
    setAmt(event.target.value);
  };
  const [flag, setFlag] = useState(false);

  const slRef = useRef();
  const sgRef = useRef();
  let [loadingState, setLoadingState] = useState(false);
  const [plan, SetPlan] = useState("");


  const handleClick = async (title) => {
    console.log(title,"title");
    setLoadingState(true);
    // e.preventDefault();
    const order = await axios.post(
      "https://zrading-backend.onrender.com/api/trader/subscribed",
      {
        // amount: amt,
        name: items.name,
        trader_id: items.trader_id,
        membership: title,
        bio:items.bio
      }
    );
    props.fun();
    console.log({
      name: items.name,
      id: items.trader_id,
      membership: title,
      bio:items.bio
    });
    if (order.length === 0) {
      console.log("Order Failed!");
    } else {
      console.log("Order Placed Successfully!");
      alert("Subscribed " + items.name +" Successfully");
      props.close();
      //   setLoadingState(false);
      //   navigateTo();
    }
  };
  useEffect((e) => {
    // temp(e, "cipla");

    setLoadingState(false);
  }, []);
  // function handleClick(e) {
  //   console.log("Button clicked!");
  // }

  return (
    <div className="app-wrapper">
      {cardsData.map((props) => {
        // {{console.log(props.title)}}
        return (
          <PricingCard
            {...props}
            key={props.id}
            clickMe={() => {
                handleClick(props.title)
                
            }
                
            }
          />
        );
      })}
    </div>
  );
}

const cardsData = [
  // {
  //   id: 1,
  //   type: "free",
  //   title: "Free Plan",
  //   description: "Lorem ipsum",
  //   price: 19.99,
  //   recurrency: 14.99,
  //   mostPopular: false,
  //   data: ["2TB Storage", "100 E-mails"]
  // },
  {
    id: 2,
    type: "basic",
    title: "Basic Plan",
    description: "Lorem ipsum",
    price: 29.99,
    recurrency: 24.99,
    mostPopular: false,
    data: ["2TB Storage", "200 E-mails", "10 Accounts"],
  },
  {
    id: 3,
    type: "medium",
    title: "Medium Plan",
    description: "Lorem ipsum",
    price: 69.99,
    recurrency: 59.99,
    mostPopular: true,
    data: ["10TB Storage", "500 E-mails", "20 Accounts", "24/7 Support"],
  },
  {
    id: 4,
    type: "pro",
    title: "Pro Plan",
    description: "Lorem ipsum",
    price: 99.99,
    recurrency: 84.99,
    mostPopular: false,
    data: [
      "50TB Storage",
      "Unlimited E-mails",
      "Unlimited Accounts",
      "24/7 Support",
    ],
  },
];
