var express = require('express');
var router = express.Router();

const userModel = require('../Models/userModel')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({
    message: "Welcome to users page",
    routes: {
      allUsers: "Go to /allusers, for fetching all users",
      creation: "Post request on /create with request body object to create a user which containes name, email and password",
      read: "Get request on /:id of the user whom you want to read",
      updation: "Put request on /:id and request body object to update a user which can contains name, email and password ",
      deletion: "Delete request on /:id to delete that user from the database"
    },
    success: true
  })
});

router.get('/allusers', async function (req, res, next) {
  try {

    const allUsers = await userModel.find()
    res.send({
      allUsers: allUsers,
      success: true
    })
  } catch (err) {
    res.send({
      message: "Server Error",
      error: err.message,
      success: false
    });
  }
})

//CREATE
router.post('/create', async function (req, res, next) {

  try{

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.send({
        message: "please provide details in request body",
        success: false
      })
    }
    const { name, email, password } = req.body;
    const user = await userModel.create({
      name, email, password
    })
    res.send({
      message: "User Created",
      createdUser: user,
      success: true
    })
  }catch (err) {
    res.send({
      message: "Server Error",
      error: err.message,
      success: false
    })
  }
});

//READ
router.get('/:id', async function (req, res, next) {
  try{

    const { id } = req.params;
    const user = await userModel.findOne({ _id: id })
    if (!user) {
      return res.send({
      message: "User Not Found",
      success: false
    })
  }
  res.send({
    message: "User Found",
    foundUser: user,
    success: true
  })
}catch (err) {
    res.send({
      message: "Server Error",
      error: err.message,
      success: false
    })
  }
})

//UPDATE 
router.put('/:id', async function (req, res, next) {
  try{

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.send({
        message: "please provide details in request body",
        success: false
    })
  }
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await userModel.findOneAndUpdate({ _id: id }, {
    name, email, password
  }, { new: true })
  if (!user) {
    return res.send({
      message: "User Not Found Cant Update",
      success: false
    })
  }
  res.send({
    message: "User Updated",
    updatedUser: user,
    success: true
  })
}catch (err) {
    res.send({
      message: "Server Error",
      error: err.message,
      success: false
    })
  }
})

//DELETE
router.delete('/:id', async function (req, res, next) {
  try{

    const { id } = req.params;
    const user = await userModel.findOneAndDelete({ _id: id })
    if (!user) {
    return res.send({
      message: "User Not Found Can't delete",
      success: false
    })
  }
  res.send({
    message: "User deleted",
    deletedUser: user,
    success: true
  })
}catch (err) {
    res.send({
      message: "Server Error",
      error: err.message,
      success: false
    })
  }
})

module.exports = router;
