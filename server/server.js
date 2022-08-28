// Get express and mysql modules
const express = require('express');
const mysql = require("mysql");
const cors = require("cors");

// Get bcrpyt module for hashing passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Import sessions and parsers
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Get .env file for environment variables
const dotenv = require('dotenv');
const { reset } = require('nodemon');
dotenv.config({ path: './config.env'});

const jwt = require('jsonwebtoken');
const { response } = require('express');


// Create app variable
const app = express();

app.get('/client', express.static('client'));

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    key: "user_id",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24 * 30
    },
  })
)


// Create connection to database
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Connect to database
db.connect((err) => {
  if (err){
    console.log("error");
    throw err;
  }
  console.log("Database connected");
});


// Register API
app.post('/register', (req,res) => {

  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  // Hash password and insert new user
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", 
    [username, hash, email], (err, result) => {
      if (err) {
        res.send({err: err})
      } else {

        db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
          if (err) {
            res.send({err: err})
          } else {

            // Create JWT
            const id = result[0].id;
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
              expiresIn: 300
           })

            // Create session
            req.session.user = result;
            res.json({authorized: true, token: token});
          }
        })
      }
    })
  })
})

const port = 5000;

app.listen(port, () => {console.log("Server started on port 5000")});


// Check to see if username exists
app.post('/confirmUser', (req, res) => {
  
  const username = req.body.username;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({err: err})
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({message: "User does not exist"})
      }   
    }
  )

})

// Check to see if email is already registered
app.post('/confirmEmail', (req, res) => {
  
  const email = req.body.email;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.send({err: err})
      }
      if (result.length > 0) {
        // This email exists within the database
        res.send(result);
      } else {
        // This email does not exist within the database
        res.send({message: "Email is not registered"})
      }   
    }
  )

})



// Login API
app.post('/login', (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({err: err})
      }
      if (result.length > 0) {

        // Hash the inputted password and compare with hash in the database
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            
            // Password authenticated
            // Create JWT
            const id = result[0].id;
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
              expiresIn: 300
            })

            // Create session
            req.session.user = result;
            res.json({authorized: true, token: token});

          } else {
            res.send({message: "Invalid password."})
          }
        })
      } 
    }
  )
})


app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
})

app.post('/saveCanvas', (req, res) => {
  const canvas_data = req.body.stringified;
  const page_id = req.body.page_id

  db.query("UPDATE pages SET canvas_data=? WHERE page_id=?", 
  [canvas_data, page_id], (err, result) => {
    if(err) {
      res.send.apply({err: err})
    } else {
      res.send({message: "Successfully saved"})
    }
  })

})

app.post('/loadData', (req, res) => {

  const page_id = req.body.page_id;

  db.query("SELECT canvas_data FROM pages WHERE page_id = ?", (page_id), (err, result) => {
    if (err) {
      res.send({err: err})
    } else {
      const newResult = JSON.parse(JSON.stringify(result));

      if(newResult[0].canvas_data){

        const listElements = newResult.map(
          (element) => {
            return element.canvas_data
          }
        )
  
        res.send(listElements[0]);

      }
      

    }
  })
})

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send({message: "Logged out"})
})

app.post('/createNewJournal', (req, res) => {
  
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const cover = req.body.cover;

  db.query("INSERT INTO journals (username, title, description, cover) VALUES (?,?,?,?)", 
  [username, title, description, cover], (err, result) => {
    if(err) {
      res.send.apply({err: err})
    } else {;
      res.send({message: "Successfully created"})
    }
  })

})

app.post('/createNewPage', (req, res) => {
  
  const journal_id = req.body.journal_id;
  const canvas_data = req.body.canvas_data

  db.query("INSERT INTO pages (journal_id, canvas_data) VALUES (?, ?)", 
  [journal_id, canvas_data], (err, result) => {
    if(err) {
      res.send.apply({err: err})
    } else {;
      res.send({message: "Successfully created page"})
    }
  })

})

app.post('/createFirstJournalPage', (req, res) => {
  const journal_id = req.body.journal_id;

  db.query("INSERT INTO pages (journal_id, page_order) VALUES (?,?)", 
  [journal_id, 1], (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send({message: "Successfully created first page"})
    }
  })


})

app.post('/updateJournal', (req, res) => {
  
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;

  db.query("UPDATE journals SET title=?, description=? WHERE journal_id=?", 
  [title, description, id], (err, result) => {
    if(err) {
      res.send.apply({err: err})
    } else {
      res.send({message: "Successfully edited"})
    }
  })

})

app.post('/deleteJournal', (req, res) => {
  
  const id = req.body.id;

  db.query("DELETE FROM journals WHERE journal_id=?", 
  [id], (err, result) => {
    if(err) {
      res.send.apply({err: err})
    } else {
      res.send({message: "Successfully deleted"})
    }
  })

})

app.post('/deletePage', (req, res) => {
  
  const id = req.body.id;

  db.query("DELETE FROM pages WHERE page_id=?", 
  [id], (err, result) => {
    if(err) {
      console.log(err);
      res.send.apply({err: err})
    } else {
      res.send({message: "Successfully deleted"})
    }
  })

})

app.post('/loadJournals', (req, res) => {

  const username = req.body.username;

  db.query("SELECT * FROM journals WHERE username = ?", (username), (err, result) => {
    if (err) {
      res.send({err: err})
    } else {
      const newResult = JSON.parse(JSON.stringify(result));
      res.send(newResult);
    }
  })
})

app.post('/loadTemplates', (req, res) => {

  db.query("SELECT * FROM templates", (err, result) => {
    if (err) {
      res.send({err: err})
    } else {
      const newResult = JSON.parse(JSON.stringify(result));
      res.send(newResult);
    }
  })
})

app.post('/loadPages', (req, res) => {

  const journal_id = req.body.journal_id;

  db.query("SELECT * FROM pages WHERE journal_id = ? ORDER BY page_id", (journal_id), (err, result) => {
    if (err) {
      res.send({err: err})
    } else {
      res.send(result);
    }
  })
})

app.post('/getPageId', (req, res) => {

  const journal_id = req.body.journal_id;
  const page_order = 1;

  db.query("SELECT page_id FROM pages WHERE journal_id = ? AND page_order = ?", [journal_id, page_order], (err, result) => {
    if (err) {
      res.send({err: err})
    } else {
      res.send(result);
    }
  })
})