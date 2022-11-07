import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Card,
    CardActionArea,
    Grid,
    Container,
    Stack,
    Link,
    Typography
} from "@mui/material";

export default function Tiles() {
    const router = useRouter()
    var { level } = router.query //get level query
    const [gameOver, setGameOver] = useState(false) //game over boolean
    const randomEmoji = require('random-unicode-emoji'); //to get emojis
    const [boardData, setBoardData] = useState([]); //all emojis in the game
    const [nextLevel, setNextLevel] = useState(0); //next level number counter
    const [chosenCards, setChosenCards] = useState([]); //list of chosen cards
    const [matchedCards, setMatchedCards] = useState([]); //list of matched cards
    const [moves, setMoves] = useState(0); //number of moves - per click

    useEffect(() => {
        setNextLevel(parseInt(level) + 1); //set next level counter
        shuffle(); //shuffle the cards
    }, [level]); //update each level

    useEffect(() => {//game over check
        if (matchedCards.length == parseInt(level)*2) {
            setGameOver(true);
        }
    }, [moves]); //update the gave over check after every move

    const shuffle = () => {
        const Emoji = randomEmoji.random({ count: level })//get emojis
        const shuffledCards = [...Emoji, ...Emoji] //duplicate the emojis
            .sort(() => Math.random() - 0.5) //randomize the index
            .map((v) => v); //map them

        setBoardData(shuffledCards); //save the randomized shuffled emojis
    };
    const updateActiveCards = (index) => {
        if (!chosenCards.includes(index)) {//if chosen card is not in the chosen emojis array
            if (chosenCards.length == 1) {
                const firstIdx = chosenCards[0];
                const secondIdx = index;
                if (boardData[firstIdx] == boardData[secondIdx]) {//compare if emojis is matched
                    setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);//add to matched emojis
                }

                setChosenCards([...chosenCards, index]);//save the chosen emojis
            } else if (chosenCards.length == 2) {
                setChosenCards([index]); //reset chosen emojis
            } else {
                setChosenCards([...chosenCards, index]);//save the chosen emojis
            }

            if(!gameOver){ //stop incrementing when game over
            setMoves((v) => v + 1);//update moves    
            }
            
            console.log(`chosen cards ${chosenCards}`)
            console.log(`matched cards ${matchedCards}`)
        }
    };
    const emojiStatus = (index) => {
        if (matchedCards.includes(index)) {
            return "matched"
        }
        else if(chosenCards.includes(index)){
            return "chosen"
        }
        else return "none"
    };

    return (
        <Container maxWidth="lg" sx={{ padding: "20px 0" }}>
            <Container component="header" sx={{ padding: "10px 0" }}>
                <Stack component="nav" direction="row" justifyContent="space-between" spacing={2}>
                    <a>Level {level}</a>
                    <p>{`Moves : ${moves}`}</p>
                    <p>{`GameOver : ${gameOver}`}</p>
                    <Link href={`/tiles?level=${nextLevel}`}>
                        Level {nextLevel}</Link>
                </Stack>
            </Container>
            <Grid container component="main" spacing={2}>
                {boardData.map((data, index) => (
                    
                    <Grid item key={index} lg={2}>
                        <Card className={`${emojiStatus(index)}`} onClick = {() => {updateActiveCards(index);}} style={{transform: [{ rotate: '90deg' }]}}>
                            <CardActionArea>
                                    <Typography variant="h4" component="div" align="center" style={{transform: [{ rotate: `${Math.random()}deg` }]}}>
                                        {data}
                                    </Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
