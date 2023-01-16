"use client"
import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";
import { UserContext } from '../../lib/UserContext';
import {
  Button,
  Card,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (response.ok) {
    return await response.json();
  }
  throw new Error(response.status);
};

const Ideas = () => {
  const [user, setUser] = useContext(UserContext);
  const [ideas, setIdeas] = useState([]);
  const [identifier, setIdentifier] = useState("no user id in storage");
  const router = useRouter()

  useEffect(() => {

    if (JSON.parse(localStorage.getItem("identifier"))) {

      //checking if there already is a identifier in local storage
      //if yes, get the identifier
      const key = localStorage.getItem("identifier")
      setIdentifier(key);

    } else {
      //if there is no identifier in local storage, set new identifier
      if (queryId.isSuccess) {
        localStorage.setItem("identifier", JSON.stringify(queryId.data));
        setIdentifier(queryId.data);
      }
    }
  });
  //user validation, if not validated return to login screen
  useEffect(() => {
    setUser({ loading: true });
    fetch('/api/userAuthCheck')
      .then(res => res.json())
      .then(data => {
        data.user ? setUser(data.user) : router.push('/login') && setUser({ user: null });
      });
  }, []);

  //get ideas
  const query = useQuery(
    ["ideas"],
    async () => await fetcher(`http://localhost:3000/api/${{identifier}}/ideas`),
    {
      retry: true,
    }
  );
  //get id
  const queryId = useQuery(
    ["identifier"],
    async () => await fetcher("http://localhost:3000/api/identifier"),
    { retry: false, });

  //if query is successful, get ideas
  useEffect(() => {
    if (query.isSuccess) {
      setIdeas(query.data);
    }
  });



  return (
    <>
      <Button variant="AddIdea" onClick={() => { router.push('/createideas')}}>Add Idea</Button>
      {ideas.map((idea) => (
        <Card sx={{ maxWidth: 345 }} key={idea.id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {idea.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {idea.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Delete</Button>
          </CardActions>
        </Card>))}
    </>
  );
};

export default Ideas;
