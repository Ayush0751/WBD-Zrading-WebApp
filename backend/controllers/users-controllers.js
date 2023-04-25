// import { createClient } from 'redis';
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const { User, Copy, History,Traders } = require("../models/user");
// const async = require("hbs/lib/async");
const Post = require("../models/post")
const Subscription = require("../models/subscription")

const Redis  = require('redis')
const redisClient = Redis.createClient({url:'rediss://red-ch3gid4eoogsn035o4t0:dzb0BGdaC7UGDeIDoWTEgLKfd04FMLOU@oregon-redis.render.com:6379'})
const DEFAULT_EXPIRATION = 3600

const cloudinary = require("../utils/cloudinary")
const getDataUri = require("../utils/dataUri")

// const redisClient = createClient();

redisClient.connect();
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, imgName } = req.body;
  // console.log(req.file);
  console.log(req.body);

  let existingUser;
  try {
    console.log(email);
    existingUser = await User.findOne({ email: email });
    console.log("hiiii");
    
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  console.log("hiiii");
  // console.log(image);
  const createdUser = new User({
    name,
    email,
    image: imgName,
    password,
  });
  console.log(createdUser);

  try {
    createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  const userList = await redisClient.get(`userList?email=${email}`);
  if(userList){
    existingUser = (JSON.parse(userList))
  }
  else{
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        "Loggin in failed, please try again later.",
        500
      );
      return next(error);
    }
    redisClient.setEx(`userList?email=${email}`, DEFAULT_EXPIRATION,JSON.stringify(existingUser));


  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({
    message: "Logged in!",
    user: existingUser,
  });
};
let amount;
let orderend;
let orderstart;

const sendCopy = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { amount, stoploss, stopgain,name } = req.body;
  console.log({
    stoploss: stoploss,
    stopgain: stopgain,
    amount: amount,
    name:name
  });
  const createCopy = new Copy({
    amount,
    stoploss,
    stopgain,
    name
  });
  try {
    createCopy.save();
  } catch (err) {
    const error = new HttpError(
      "Order Failed, Please create your order again",
      500
    );
    return next(error);
  }
  res.status(201).json({ copy: createCopy.toObject({ getters: true }) });
};

const getOrders = async (req, res, next) => {
  // const errors = validationResult(req);
  // // let copyarr;
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Bad request", 422)
  //   );
  // }
  let result;
  console.log("h");
  try {
    result = await Copy.find();
    console.log("dadaaf");
  } catch (err) {
    const error = new HttpError(
      "Can't fetch orders now, please try again after sometime",
      500
    );
    // return next(error);
  }

  res.json({ result });
  // res.send()
  // console.log(res);
  // return res;
};
const historyAdd = (amount, orderstart,name) => {
  const createHistory = new History({
    amount,
    orderstart,
    name
  });
  try {
    createHistory.save();
    alert("history created");
  } catch (error) {
    res.status(500).json({ error: error.message });
    return next(error);
  }
  res.status(201).json({ history: createHistory.toObject({ getters: true }) });
};
const deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  console.log(id, "id");
  try {
    const histdata = await Copy.findById(id);
    const { amount, ordertime,name } = histdata;
    console.log(histdata, "histdata");
    historyAdd(amount, ordertime,name);

    console.log(result, "result");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


  try {
    const result = await Copy.findByIdAndDelete(id);

    console.log(result, "result");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getHistory = async (req, res, next) => {
  let result;
  console.log("h");
  try {
    result = await History.find();
    console.log("history passed");
  } catch (error) {
    res.status(500).json({ error: error.message });
    // return next(error);
  }
  console.log(result, "result");
  res.json({ result });
};
const getTraders = async (req, res, next) => {
  let result;
  console.log("hola");
  const traderLists = await redisClient.get(`traderLists`);
  if(traderLists){
    result = (JSON.parse(traderLists))
  }
  else{
    try {
      result = await Traders.find();
      console.log("Trader passed");
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
    redisClient.setEx(`traderLists`, DEFAULT_EXPIRATION,JSON.stringify(result));
  }
  console.log(result, "result5555");
  res.json({ result });
};

const getUser=async(req,res,next)=>{
  const email = req.params.email;
  let result;
  console.log(email, "email");
  try {
     result = await User.findOne({email:email});
    console.log(result, "userData");

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  res.json({result})
}


const getPost = async (req, res, next) => {
  let result;
  const postid = await Post.findOne({}, { _id: 1 }).sort({ _id: -1 });
  console.log("id is ",postid);
  console.log("h");
  const postLists = await redisClient.get(`postLists?id=${postid}`);
    if(postLists){
      result = (JSON.parse(postLists))
    }
    else{
      result = await Post.find({}).sort({ createdAt: -1 });
      // console.log(result,"holaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      try {
        console.log("post details fetched");
      } catch (error) {
        res.status(500).json({ error: error.message });
        return next(error);
      }
    
      console.log(result, "result");
      redisClient.setEx(`postLists?id=${postid}`, DEFAULT_EXPIRATION,JSON.stringify(result));
      // redisClient.setEx("postListsLen",JSON.stringify(count));
    }
    res.json({ result });
};


const postCreate = async (req, res) => {
  const { postText, postImageName } = req.body;
  const file = req.file;
  // console.log("kjhjkkijpo",file);
  const fileUri = getDataUri(file)
  console.log("kjhjkkijpo",fileUri);
  const myCloud = await cloudinary.uploader.upload(fileUri.content)
  console.log("kjhjkkijpo",myCloud);
  const cloudimgurl = myCloud.secure_url;
  console.log("hi20212");
  console.log(postText);
  console.log(postImageName);
  const post = new Post({
    postText,
    postImage: cloudimgurl,
  });
  try{
  await post.save()
    .then((result) => {
      res.redirect("/discover");
    })
  }
    catch(err){
      console.log(err);
    };
};

const deletePost = async (req, res, next) =>{
  const id = req.params.id;
  console.log(id, "<----id");


  try {
    const result = await Post.findByIdAndDelete({_id:id});

    console.log(result, "result");
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const addSubscription = async (req, res, next) =>{

  const { name, trader_id,membership,bio} = req.body;
  // console.log(req.file);
  console.log(req.body);

  let existingSubs;
  try {
    console.log(trader_id,"trader_id");
    existingSubs = await User.findOne({ trader_id: trader_id });
    console.log("hiiii");
    
  } catch (err) {
    const error = new HttpError(
      "Adding Subscription failed, please try again later.",
      500
    );
    return next(error);
  }
  
  if (existingSubs) {
    const error = new HttpError(
      "Subscription already added.",
      422
    );
    return next(error);
  }
  console.log("hiiii");
  // console.log(image);
  const createSubs = new Subscription({
    name, 
    trader_id,
    membership,
    bio
  });
  console.log(createSubs);

  try {
    createSubs.save();
  } catch (err) {
    const error = new HttpError(
      "Subscription Failed, Please try again.",
      500
    );
    alert("Subscription Failed, Please try again.")
    return next(error);
  }

  res.status(201).json({ user: createSubs.toObject({ getters: true }) });
}
const getSubscriptions = async (req, res, next) =>{
    let result;
    result = await Subscription.find({});
    try {
      console.log("Subscriptions fetched");
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  
    console.log(result, "result");
    res.json({ result });
}











exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.sendCopy = sendCopy;
exports.getOrders = getOrders;
exports.deleteOrder = deleteOrder;
exports.getHistory = getHistory;
exports.getTraders = getTraders;
exports.getUser = getUser;

exports.getPost = getPost;
exports.postCreate = postCreate;
exports.deletePost = deletePost;
exports.addSubscription = addSubscription;
exports.getSubscriptions = getSubscriptions;