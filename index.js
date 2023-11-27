require("dotenv").config()

const connectDb = require("./config/db/connectDb")
const express = require("express")

// router
const { PaymentRouter } = require("./src/routes")


async function main() {
    const app = express()
    const port = process.env.PORT || 8080
    // app.use("/",(req,res)=>{
    //     res.status(200).json({message:"welcome to my api router"})
    // })

    app.use(express.json());

    app.use("/api", PaymentRouter)

    app.listen(port, () => {
        console.log(`Server is running on Port ${port}`);
    })
}

main()
