const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const userModal = require("./modals/user")

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/read", async (req, res) => {
  let displayUsers =  await userModal.find()
  res.render("read", { users: displayUsers });
});

app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
   let createdUser = await userModal.create({
        name: name,
        email: email,
        image:image
   })
    res.redirect("/read");
});

app.get("/edit/:userid", async (req, res) => {
  let updateUsers = await userModal.findOne({ _id: req.params.userid });
  res.render("edit", {updateUsers});
});

app.post("/update/:userid", async (req, res) => {
     let { name, email, image } = req.body;
  let updatedUsers = await userModal.findOneAndUpdate(
    { _id: req.params.userid },
      { name: name, email: email, image: image },
    {new:true}
  );
   res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
       await userModal.findOneAndDelete({ _id: req.params.id });
      res.redirect("/read");
});


app.listen(port, () => {
    console.log(`Your server is running on the port : ${port}`);
})