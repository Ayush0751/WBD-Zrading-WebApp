import axios from "axios";
// import async from "hbs/lib/async";

 const handleTraders =  async(e) => {
    let data;
    try {
        console.log("hii1");
        const order = await ( axios.get("https://zrading-backend.onrender.com/api/trader/allTraders"));
        console.log("hiiiiiiiiiiiiiiiiiiiiii");
        console.log(order.data.result, "history");
        data=order.data.result
      } catch (error) {
        // console.error("errorfsfsf");
        console.error(error);
      }
      return data;
    

  };

  export default handleTraders