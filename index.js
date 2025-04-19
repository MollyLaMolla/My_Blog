import express from 'express';
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(express.json());
var adminLogged = false;
var blogsArray = [];
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    adminLogged = false;
    res.render("main/home-page.ejs",{
        blogData: blogsArray,
    });
  });

app.get("/login", (req, res) => {
    adminLogged = false;
    res.render("main/login.ejs", {
        logging: true,
    });
  });

app.get("/create", (req,res)=>{
    if (adminLogged){
        res.render("main/create.ejs");
    }
    else{
        res.redirect("/");
    }
    
});

app.get("/about", (req, res) => {
    adminLogged = false;
    res.render("main/about.ejs");
  });

app.get("/contact", (req, res) => {
    adminLogged = false;
    res.render("main/contact.ejs");
  });

app.get("/admin", (req,res)=>{
    if (adminLogged){
        res.render("main/home-page.ejs", {
            blogData: blogsArray,
            logged:true,
        });
    }
    else{
        res.redirect("/");
    }
});

app.post("/edit-blog", (req, res) => {
    const blogData = {
        title: req.body.blogTitle,
        content: req.body.blogContent,
        date: req.body.blogDate,
        time: req.body.blogTime,
        id: req.body.blogId,
    };

    res.render("main/create.ejs", {
        blogDataUpdate: blogData,
    });
});

app.post("/update-blog", (req, res) => {
        var blogId = req.body["blogName"];
        var time = new Date();
        var month = time.getMonth() + 1;
        var day = time.getDate();
        var year = time.getFullYear();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (hours < 10){
            hours = "0" + hours;
        }
        if (day < 10){
            day = "0" + day;
        }
        if (month < 10){
            month = "0" + month;
        }
        const newBlog = {
            date: `${year}/${month}/${day}`,
            time: `${hours}:${minutes}`,
            title: req.body["blogName"],
            content: req.body["content"],
            id: randomId(blogId),
        };

    const blogIndex = blogsArray.findIndex(blog => blog.id === req.body["oldBlogId"]);
    if (blogIndex !== -1) {
        blogsArray[blogIndex] = newBlog;
    }
    res.redirect("/admin");
});

app.post("/delete-blog", (req, res) => {
    const blogId = req.body["blogToDeleteId"];
    const blogIndex = blogsArray.findIndex(blog => blog.id === blogId);
    if (blogIndex !== -1) {
        blogsArray.splice(blogIndex, 1);
    }
    res.redirect("/admin");
});
app.get("/adminabout", (req,res)=>{
    if (adminLogged){
        res.render("main/about.ejs", {
            logged:true,
        });
    }
    else{
        res.redirect("/about");
    }
});

app.get("/blog/:id", (req, res) => {
    const blogId = decodeURIComponent(req.params.id);
    const blogData = blogsArray.find(blog => blog.id && blog.id.toLowerCase() === blogId.toLowerCase());
    if (blogData) {
        res.render("main/blog-card.ejs", {
            blogDate: blogData.date,
            blogTime: blogData.time,
            blogTitle: blogData.title,
            blogContent: blogData.content,
            blogId: blogData.id,
            logged: adminLogged,
        });
    } else {
        res.status(404).send("Blog not found");
    }
});

app.get("/admincontact", (req,res)=>{
    if (adminLogged){
        res.render("main/contact.ejs", {
            logged:true,
        });
    }
    else{
        res.redirect("/contact");
    }
});

app.post("/submit", (req, res) =>{
    const userName = req.body["userName"];
    const password = req.body["password"];
    if (userName.toLowerCase() === "fskmolly" && password === "Sasha,02,09,2004"){
        adminLogged = true;
        res.setTimeout(500, ()=>{
            res.redirect("/admin");
        });
        
    }
    else{
        res.setTimeout(500, ()=>{
            res.redirect("/login");
        });
        
    }
});

app.post("/create", (req,res)=>{
    res.redirect("/create");
});

app.post("/add-blog", (req,res)=>{
    let blogId = req.body["blogName"];
    var time = new Date();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var year = time.getFullYear();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (hours < 10){
        hours = "0" + hours;
    }
    if (day < 10){
        day = "0" + day;
    }
    if (month < 10){
        month = "0" + month;
    }
    const newBlog = {
        date: `${year}/${month}/${day}`,
        time: `${hours}:${minutes}`,
        title: req.body["blogName"],
        content: req.body["content"],
        id: randomId(blogId),
    };

    blogsArray.push(newBlog);
    res.redirect("/admin");
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

function randomId(blogName) {
    if (blogsArray.some(blog => blog.id === blogName)) {
        blogName = blogName + Math.floor(Math.random() * 1000);
        if (blogsArray.some(blog => blog.id === blogName)) {
            blogName = blogName + Math.floor(Math.random() * 1000);
            
        }
    }
    return blogName;
  }


    
