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

    console.log(typeof username);
    console.log(typeof avatar);

    if (username === "" || avatar === "" || !username || !avatar){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if (/^[0-9]+$/.test(username) || /^[0-9]+$/.test(avatar)){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    users.push({username, avatar});

    res.status(201).send("OK");
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

// RECEBER TWEETS DO USUÁRIO
app.get("/tweets/:username", (req, res) => {

    const {username} = req.params;

    const tweetsUser = tweets.filter( user => user.username === username);

    res.send(tweetsUser);
});

// ENVIOS DOS TWEETS
app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;

    const userCurrent = users.find( user => user.username === username);

    if (username === "" || tweet === "" || !username || !tweet){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if (/^[0-9]+$/.test(username) || /^[0-9]+$/.test(tweet)){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if (!userCurrent){
        return res.status(401).send("UNAUTHORIZED");
    }

    if (tweets.length < 10){
        tweets.push({username, tweet});
    }else{
        tweets.shift();
        tweets.push({username, tweet});
    }

    return res.status(201).send("OK");

});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));