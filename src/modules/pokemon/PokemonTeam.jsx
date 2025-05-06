import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getDoc, doc } from "firebase/firestore";

import { db } from "../../service/firebase.js";

import Pokemon from "./Pokemon.jsx";
import CopyButton from "../common/CopyButton.jsx";

import { PASTES_COLLECTION } from "../../constants/firestore.js";

function PokemonTeam() {
  const { id } = useParams();
  const [teamName, setTeamName] = useState("");
  const [pokemonTeam, setPokemonTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, PASTES_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        const teamName = data.teamName;
        const team = Object.entries(data)
          .filter(([key]) => key.startsWith("Poke"))
          .map(([, value]) => value);

        setTeamName(teamName);
        setPokemonTeam(team);
      } else {
        console.error("Doc not found");
      }
    }

    fetchData();
  }, [id]);
  
  return (
    <div>
      <h1>{teamName}</h1>
      {pokemonTeam.map((pokemon, index) => {
        return (
          <Pokemon key={index} pokemonInfo={pokemon} />
        );
      })}
      <CopyButton displayText="Copy team" copyText={pokemonTeam.join("\n\n")} />
    </div>
  );
}

export default PokemonTeam;
