const express = require("express")
const app = express()
const axios = require("axios")

app.use(express.json())

const ApiLink = 'https://dragonball-api.com/api/'

app.get("/AllCharacters", async (req,res) => {

    try {
        let charLink =  await axios.get(`${ApiLink}characters`)

        res.send(charLink.data)

    } catch (error) {
        console.error(error)
    }
})

app.get("/Character/:id",async (req,res) => {
    try {
        let character = req.params.id

        let charData = await axios.get(`${ApiLink}characters/${character}`)
        res.send(charData.data)
    } catch (error) {
        console.error(error)
    }

   
} )

app.get("/filterChar", async (req,res) => {

    const {name,gender,race,affiliation} = req.query

    let queryReq = ``
    if (name) queryReq += `name=${name}&` 
    if (gender) queryReq += `gender=${gender}&` 
    if (race) queryReq += `race=${race}&` 
    if (affiliation) queryReq += `affiliation=${affiliation}&` 
    const characters = await axios.get(`${ApiLink}characters?${queryReq}`)
    console.log(`${ApiLink}characters?${queryReq}`)
    res.send(characters.data)
})



app.listen(5000, () => console.log("Server is up"))