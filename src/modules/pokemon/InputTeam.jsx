import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";

import { db } from "../../service/firebase.js";

import { PASTES_COLLECTION } from "../../constants/firestore.js";

function InputTeam() {
  const [formData, setFormData] = useState({
    teamName: "",
    description: "",
    author: "",
    team: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pokemonList = formData.team.trim().split(/\n\s*\n/);

    const teamData = {};
    pokemonList.forEach((entry, index) => {
      teamData[`Poke${index}`] = entry.trim();
    });
    teamData["teamName"] = formData.teamName;
    teamData["description"] = formData.description;
    teamData["author"] = formData.author;

    try {
      const docRef = await addDoc(collection(db, PASTES_COLLECTION), teamData);
      navigate(`/${docRef.id}`);
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  };

  return (
    <div className="flex flex-col p-5 h-screen">
      <h1 className="title mb-3">Input Pokémon Team</h1>

      <form className="flex flex-col gap-y-2 flex-1" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-2 w-full max-w-3xl">
          <input
            id="teamName"
            className="glass flex-1 px-2 py-1"
            type="text"
            placeholder="Team name"
            value={formData.teamName}
            onChange={(e) =>
              setFormData({ ...formData, teamName: e.target.value })
            }
          />
          <input
            id="teamAuthor"
            className="glass flex-1 px-2 py-1"
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          <button className="glass px-2" type="submit">
            Save team
          </button>
        </div>

        <textarea
          id="teamDescription"
          className="glass resize-none px-2 py-1 w-full max-w-3xl h-28"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <textarea
          id="teamData"
          className="glass resize-none px-2 py-1 w-full flex-1 focus:outline-none"
          placeholder="Paste your Pokémon team here..."
          value={formData.team}
          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
        />
      </form>
    </div>
  );
}

export default InputTeam;
