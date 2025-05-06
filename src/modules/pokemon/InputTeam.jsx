import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";

import { db } from "../../service/firebase.js";

import { PASTES_COLLECTION } from "../../constants/firestore.js";

function InputTeam() {
  const [text, setText] = useState("");
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pokemonList = text.trim().split(/\n\s*\n/);

    const teamData = {};
    pokemonList.forEach((entry, index) => {
      teamData[`Poke${index}`] = entry.trim();
    });
    teamData['teamName'] = teamName;

    try {
      const docRef = await addDoc(collection(db, PASTES_COLLECTION), teamData);
      navigate(`/${docRef.id}`);
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  };

  return (
    <div>
      <h1>Input Pokémon Team</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="85"
          cols="75"
          placeholder="Paste your Pokémon team here..."
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button type="submit">Save team</button>
      </form>
    </div>
  );
}

export default InputTeam;
