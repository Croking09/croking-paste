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
    teamName: "",
    description: "",
    author: "",
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
    };

    fetchData();
  }, [id]);

  return (
    <main className="p-5">
      <div className="flex flex-col gap-3 max-w-3xl">
        <h1 className="title">{teamData.teamName}</h1>
        <h2 className="subtitle">Author: {teamData.author}</h2>
        <h3 className="max-w-2xl text-pretty">{teamData.description}</h3>
        <div>
          <CopyButton
            displayText="Copy this team"
            copyText={teamData["team"].join("\n\n")}
          />
          <span> or Share the Link!</span>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-10">
        {teamData["team"].map((pokemon, index) => {
          return <Pokemon key={index} pokemonInfo={pokemon} />;
        })}
      </section>
    </main>
  );
}

export default PokemonTeam;
