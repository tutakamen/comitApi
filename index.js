//Start 2.0
// 1. import the express module
const express = require("express");
const app = express();
 
// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;

// 1a. When building an API, you have to configure EXPRESS to return data using a structured format (JSON)
// - express.json() --> ensure that all responses are sent in JSON format
app.use(express.json())

let upcomingMovies = [
    {
        "id": 1,
        "name":"Fast and Furious 9",
        "desc":"The last installement of the Fast and Furious franchaise! we hope!"
    },
    {
        "id": 2,
        "name":"Chaos Walking",
        "desc":"Surivial movie, zombies, apocolyse"
    },
    {
        "id":3,
        "name":"Mortal Kombat",
        "desc":"A remake of the classic 1995 film, based on the seminal video game series"
    },
    {
        "id":4,
        "name":"Black Widow",
        "desc":"The latest addition to the MCU, which seems to have been COMING FOREVERRRRR"
    }
 ]
 
// 2. Reply as JSON
app.get("/", (req, res) => {
    //.status is the reponse code whihc is important for API development !
   res.status(418).send({"name":"Peter", "age":99});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/api/movies", (req, res) => {
    // reply with all the movies in the database
    res.send(upcomingMovies)
 })
 
 app.get("/api/movies/:movieID", (req,res) => {   
    // 2a. Retrieve the id the user specified (retrieve :movieID)   
    console.log(req.params)
    // convert the param to a int so we can find it in the array
    let requestedId = parseInt(req.params.movieID)
    console.log(`User wants to find movie with id: ${requestedId}`)
    // 2b. Search the array for the movie with that specified ID
    for (let i = 0; i < upcomingMovies.length; i++) {
        let movie = upcomingMovies[i]
        if (movie.id === requestedId) {
            // 2c. If found, then send back the movie (and a status code)
            res.send(movie)
            return
        }
    }
    // 2d. If NOT found, then send back an error message (and an appropriate status code)
    res.status(404).send({"error": "Sorry, we cannot find the movie"})
 })
 
 // 3. CREATE a movie --> POST
app.post("/api/movies", (req, res) => {
    // 3a. GET the data from the user they want to insert
    let movieToInsert = req.body
    // 3b. ADD it to your data source
    // - let smake a rule that says all new movies MUST have a title and description
    if ("name" in req.body && "desc" in req.body) {
        // insert
        upcomingMovies.push(movieToInsert)
        // RESPOND with an appropriate message
        res.send({"msg":"Inserted successfully!"})
        return
    }
    // 3c. If it iddn't have the title and desc, then do not insert & show an error
    res.status(401).send({"msg":"Sorry, you are missing required data"})
 })
  
 
 // 4. DELETE a movie --> DELETE
app.delete("/api/movies/:moviesID", (req,res) => {
    // get id of movie to delete
    let idToDelete = parseInt(req.params.moviesID)
    // search data source for the movie
    for (let i = 0; i < upcomingMovies.length; i++) {       
        if (upcomingMovies[i].id === idToDelete) {
            // 2c. If found, then delete movie from the current position
            upcomingMovies.splice(i, 1)
            // 2d. send back a success message
            res.send({"msg":"Delete success!"})
            return
        }
    }
    // if movie not found, then return error
    res.status(404).send({"error": "Sorry, we cannot find the requested movie"})
 })
 
   
//////////////////////////////////////////////////////////////////////////////////////////////////////

// start the server and output a message if the server started successfully
const onHttpStart = () => {
 console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}
app.listen(HTTP_PORT, onHttpStart);

