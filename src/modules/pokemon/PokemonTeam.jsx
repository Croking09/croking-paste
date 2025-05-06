import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getDoc, doc } from "firebase/firestore";

import { db } from "../../service/firebase.js";

import Pokemon from "./Pokemon.jsx";
import CopyButton from "../common/CopyButton.jsx";

import { PASTES_COLLECTION } from "../../constants/firestore.js";

function PokemonTeam() {
  const { id } = useParams();
  const [teamData, setTeamData] = useState({
    teamName: '',
    description: '',
    author: '',
    team: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, PASTES_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        const teamName = data.teamName;
        const description = data.description;
        const author = data.author;
        const team = Object.entries(data)
          .filter(([key]) => key.startsWith("Poke"))
          .map(([, value]) => value);

        setTeamData({ teamName, description, author, team });
      } else {
        console.error("Doc not found");
      }
    }

    fetchData();
  }, [id]);
  
  return (
    <div>
      <h1>{teamData.teamName}</h1>
      <p>{teamData.description}</p>
      <p>Author: {teamData.author}</p>
      {teamData['team'].map((pokemon, index) => {
        return (
          <Pokemon key={index} pokemonInfo={pokemon} />
        );
      })}
      <CopyButton displayText="Copy team" copyText={teamData['team'].join("\n\n")} />
    </div>
  );
}

export default PokemonTeam;
