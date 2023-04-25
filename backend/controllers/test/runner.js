'use strict';
process.env.NODE_ENV = 'test';
const express = require('express');
const app = express();
// const base = process.env.PWD;
const base = process.cwd();
const mongoose = require('mongoose'),
    posts = require(base + '/controllers/users-controllers'),
    
    should = require('should'),
    testUtils = require(base + '/test/util'),
    {User,Copy,History,Traders} = require(base + '/models/user');
    const Post = require(base+"/models/post")

describe("Post api", () => {
  let id, dummyPost;
  before( (done) => {
    mongoose.Promise = Promise;
    mongoose.connect(`mongodb+srv://Ayush0751:clusture0751@cluster0.nhdkbx9.mongodb.net/test_db?retryWrites=true&w=majority`,done()).then(() => {
      console.log("connected");
  app.listen(8081);
  })
  .catch(err => {
  console.log(err);
      });
    
      dummyPost = new User({
        'name': 'ayush',
        'email': 'sjndsfjb@lnasf.com',
        'image': '',
        'password': 'sdfhjlb'
      });

      dummyPost.save((err, post) => {
          if (err) { res.send(err); }
          id = post._id;
      });
  });
});

  describe("Create user", () => {
      it("should create a new post", (done) => {
        let req = {
          body : {'name': 'ayushSingla',
                  'email': 'sjndssafsfjb@lnasf.com',
                  'password': 'sdffahjlb',
                  'image': ''
                }
        };

        let res = testUtils.responseValidatorAsync(200, (post) => {
          post.should.have.property('name');
          post.title.should.equal('ayushSingla');
          
        },done());
        

        // const { name, email, password, imgName } = req.body;
        
        posts.signup(req, res);
      });

      it("should throw an error for empty email", (done) => {
        let req = {
          body : {'name': 'ayush',
                  'email': '',
                  'password': 'sdfhjlb',
                  'image': ''
                }
        };

        let res = testUtils.responseValidatorAsync(500, (err) => {
          
        },done());

        posts.signup(req, res);
      });
  });
  describe("GET Users", () => {
      it("should respond with an array of posts", (done) => {
        let req = {};

        let res = testUtils.responseValidatorAsync(200, (posts) => {
          posts.length.should.equal(2);
          posts[0].should.have.property('title');
          
        },done());

        posts.getUser(req, res);
      });
  });


  describe("Post posts", () => {
    it("should create a new post", (done) => {
      let req = {
        body : {'postText': 'img',
                'postImage': 'imageHere'
              }
      };

      let res = testUtils.responseValidatorAsync(200, (post) => {
        post.should.have.property('postText');
        post.title.should.equal('img');
        
      },done());
      
      posts.postCreate(req, res);
    });
  });

  describe("Create user", () => {
    it("should create a new post", (done) => {
      let req = {
        body : {'name': 'ayushSingla',
                'email': 'sjndssafsfjb@lnasf.com',
                'password': 'sdffahjlb',
                'image': ''
              }
      };

      let res = testUtils.responseValidatorAsync(200, (post) => {
        post.should.have.property('name');
        post.title.should.equal('ayushSingla');
        
      },done());
      

      // const { name, email, password, imgName } = req.body;
      
      posts.signup(req, res);
    });

    it("should throw an error for empty email", (done) => {
      let req = {
        body : {'name': 'ayush',
                'email': '',
                'password': 'sdfhjlb',
                'image': ''
              }
      };

      let res = testUtils.responseValidatorAsync(500, (err) => {
        
      },done());

      posts.signup(req, res);
    });
});
describe("GET Users", () => {
    it("should respond with an array of posts", (done) => {
      let req = {};

      let res = testUtils.responseValidatorAsync(200, (posts) => {
        posts.length.should.equal(2);
        posts[0].should.have.property('title');
        
      },done());

      posts.getUser(req, res);
    });
});


describe("Post posts", () => {
  it("should create a new post", (done) => {
    let req = {
      body : {'postText': 'img',
              'postImage': 'imageHere'
            }
    };

    let res = testUtils.responseValidatorAsync(200, (post) => {
      post.should.have.property('postText');
      post.title.should.equal('img');
      
    },done());
    
    posts.postCreate(req, res);
  });
});
describe("Create user", () => {
  it("should create a new post", (done) => {
    let req = {
      body : {'name': 'ayushSingla',
              'email': 'sjndssafsfjb@lnasf.com',
              'password': 'sdffahjlb',
              'image': ''
            }
    };

    let res = testUtils.responseValidatorAsync(200, (post) => {
      post.should.have.property('name');
      post.title.should.equal('ayushSingla');
      
    },done());
    

    // const { name, email, password, imgName } = req.body;
    
    posts.signup(req, res);
  });

  it("should throw an error for empty email", (done) => {
    let req = {
      body : {'name': 'ayush',
              'email': '',
              'password': 'sdfhjlb',
              'image': ''
            }
    };

    let res = testUtils.responseValidatorAsync(500, (err) => {
      
    },done());

    posts.signup(req, res);
  });
});
describe("GET Users", () => {
  it("should respond with an array of posts", (done) => {
    let req = {};

    let res = testUtils.responseValidatorAsync(200, (posts) => {
      posts.length.should.equal(2);
      posts[0].should.have.property('title');
      
    },done());

    posts.getUser(req, res);
  });
});


describe("Post posts", () => {
it("should create a new post", (done) => {
  let req = {
    body : {'postText': 'img',
            'postImage': 'imageHere'
          }
  };

  let res = testUtils.responseValidatorAsync(200, (post) => {
    post.should.have.property('postText');
    post.title.should.equal('img');
    
  },done());
  
  posts.postCreate(req, res);
});
});

  // describe("Delete Post", () => {
  //     it("should delete an existing post", (done) => {
  //       let req = {
  //         params: {id: id},
  //       };

  //       let res = testUtils.responseValidatorAsync(200, (post) => {
  //         post.should.have.property('removed');
  //         post.removed.should.equal(true);
          
  //       },done());

  //       posts.deletePost(req, res);
  //     });
  // });
  // describe("GET Post", () => {
  //     it("should get a post by id", (done) => {
  //       let req = {
  //         params : {id: id}
  //       };

  //       let res = testUtils.responseValidatorAsync(200, (post) => {
  //         post.title.should.equal('dummy');
  //         post.should.have.property('title');
  //         done();
  //       });

  //       posts.getPost(req, res);
  //     });

  //     it("should throw an error for invalid id", (done) => {
  //       let req = {
  //         params : {id: '23545'}
  //       };

  //       let res = testUtils.responseValidatorAsync(500, (err) => {
  //         done();
  //       });

  //       posts.getPost(req, res);
  //     });
  // });

//   describe("Update Post", () => {
//       it("should update an existing post", (done) => {
//         let req = {
//           params: {id: id},
//           body: {
//             'title': 'hey there peeps'
//           }
//         };

//         let res = testUtils.responseValidatorAsync(200, (post) => {
//           post.should.have.property('title');
//           post.title.should.equal('hey there peeps');
//           done();
//         });

//         posts.updatePost(req, res);
//       });
//   });

//   describe("Delete Post", () => {
//       it("should delete an existing post", (done) => {
//         let req = {
//           params: {id: id},
//         };

//         let res = testUtils.responseValidatorAsync(200, (post) => {
//           post.should.have.property('removed');
//           post.removed.should.equal(true);
//           done();
//         });

//         posts.removePost(req, res);
//       });
//   });

  after((done) => {
      // User.remove({}, (err) => {
      //   if(err) {console.log(err);}
      // });

      mongoose.disconnect();
      done()
  });
