import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

const tweets = [];

// RECEBER LISTA DE USUÁRIOS
app.get("/", (req, res) => {
    res.send(users);
});

// ENVIO DO USUÁRIO
app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    users.push({username, avatar});

    res.send("OK");
});

// RECEBER TWEETS
app.get("/tweets", (req, res) => {

    const tweetsPictures = [...tweets];
    tweetsPictures.forEach( item => {    
        const userAvatar = users.find( user => user.username === item.username);
        if(userAvatar){
            item.avatar = userAvatar.avatar;
        }
    })

    res.send(tweetsPictures);
});

// ENVIOS DOS TWEETS
app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;
    
    const userCurrent = users.find( user => user.username === username);

    if (!userCurrent){
        return res.send("UNAUTHORIZED");
    }

    if (tweets.length < 10){
        tweets.push({username, tweet});
    }else{
        tweets.shift();
        tweets.push({username, tweet});
    } 
    
    return res.send("OK");

});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));