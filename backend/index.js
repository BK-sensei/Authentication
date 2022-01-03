const express = require("express")
const app = express()
const port = 5000
const session = require("express-session")
const passport = require("./config/passport")
const loginRoutes = require("./routes/login")
const adminRoutes = require("./routes/admin")

app.use(express.json())

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth/login", loginRoutes)
app.use("/admin", adminRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})