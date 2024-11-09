const express = require("express");
const multer=require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { Readable } = require('stream');


const RegisterRequest = require("./requests/register");
const LoginRequest = require("./requests/login");
const FeedbackRequest = require("./requests/feedback_req");
const VideoFetch = require("./requests/videoFetch");
const fetchQuizdata = require("./requests/fect_quizdata");
const recorddata = require("./requests/recordRequest");
const fetchFeedback = require("./requests/feeback_fetch");
const addvideo = require("./requests/addvideo");
const deletevideo = require("./requests/deletevideo");
const fetchrecord = require("./requests/recordFetch");
// const uploadPdf=require('./requests/uploadPdf');
const fetchpublicpdf=require('./requests/public_fetch');

const PrivateModel=require("./models/privatePdf");
const PublicModel=require("./models/publicPdf");
const fetchprivatepdf=require("./requests/fetch_private");
const privatedelete=require("./requests/delete_privatepdf");


var bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWTSECRET;

const conn = mongoose.connection;
let publicGfs;
let privateGfs;
conn.once("open", () => {
    publicGfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "public_pdfs"
    });
    privateGfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "private_pdfs"
    });
});

app.get("/", (req, res) => {
  res.json("lingo is on");
});

app.post("/register", RegisterRequest);
app.post("/login", LoginRequest);
app.post("/submit-feedback",FeedbackRequest)
app.get('/videos/:langid', VideoFetch);
app.get('/quizdata/:langid',fetchQuizdata);
app.post('/scorerecord',recorddata);
app.get('/fetch-feedback',fetchFeedback);
app.post("/videos/:langid/:level",addvideo)
app.get('/record-fetch/:userid',fetchrecord)
app.delete("/videos/:langid/:level",deletevideo)
app.delete("/delete-private-pdf",privatedelete)



app.post("/submit-file",multer().none(),async (req, res) => {
  try {
      const { userId, lang, pdf, isPublic ,file_name,isPrivate} = req.body;
      console.log( userId, lang, pdf, isPublic ,file_name,isPrivate)
      const filename =file_name;

      const readableStream = new Readable();
      readableStream.push(pdf);
      readableStream.push(null);

      let uploadStream;
      let bucket;

      if (isPublic) {
          bucket = publicGfs;
      } else {
          bucket = privateGfs;
      }

      // Create upload stream to appropriate GridFS bucket
      uploadStream = bucket.openUploadStream(filename, {
          metadata: {
              userId,
              lang
          }
      });

      // Pipe the file data to GridFS
      readableStream.pipe(uploadStream);

      uploadStream.on("error", (error) => {
          console.error("Error uploading file:", error);
          res.status(500).json({ success: false, error: "Failed to upload file" });
      });

      uploadStream.on("finish", async () => {
          console.log("File uploaded successfully");

          if(isPrivate==="true"||isPrivate==true){
            
            const privateFile = new PrivateModel({
                userId,
                lang,
                pdf: {
                    filename,
                    contentType: "application/pdf",
                    data: pdf
                }
            });
            await privateFile.save();
          }


          if (isPublic===true||isPublic==="true") {
              // Save to public schema
              const publicFile = new PublicModel({
                  userId,
                  lang,
                  pdf: {
                      filename,
                      contentType: "application/pdf",
                      data: pdf
                  }
              });
              await publicFile.save();
          }

          res.json({ success: true });
      });
  } catch (error) {
      console.error("Error submitting file:", error.message);
      res.status(500).json({ success: false, error: "Failed to submit file" });
  }
})

app.post("/makePublic",async (req, res) => {
  try {
    const { file_name } = req.body;

    // Check if the document already exists in the public model
    const existingPublicPDF = await PublicModel.findOne({ "pdf.filename": file_name });
    if (existingPublicPDF) {
      return res.json({ success: false, error: "Document already exists in public model" });
    }
    // If the document doesn't exist in the public model, create a new one
    if (!existingPublicPDF) {
      // Find the document in the private model
      const privatePDF = await PrivateModel.findOne({ "pdf.filename": file_name });

    
      if (privatePDF) {
        const { userId, lang, pdf } = privatePDF;
        console.log(userId, lang, pdf);
        const publicPDF = new PublicModel({ userId, lang, pdf });
        await publicPDF.save();
        return res.json({ success: true, message: "Document uploaded to public list" });
      } else {
        console.log("Document not found in private model");
      }
    } else {
      return res.status(500).json({ success: false, error: "Server error" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }})




app.get("/fetch-public-files/:langID",fetchpublicpdf)
app.get("/fetch-private-files",fetchprivatepdf)

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userinfo) => {
      if (err) throw err;
      res.json(userinfo);
    });
  } else {
    res.json(null);
  }
});

app.listen(4000);

// express ->server set up post get listen
// mongoose-> mongodb connect define database
// cors-> 4000 server communication client 3000
// bcryptjs-> encryption pasword string cypher blowfish
// dotenv-> mongo oauth urls env
// axios -> client---> server pe requests
