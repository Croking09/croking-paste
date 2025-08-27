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
    <div>
      <h1>Input Pokémon Team</h1>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <input
            className="bg-green-500"
            type="text"
            placeholder="Team name"
            value={formData.teamName}
            onChange={(e) =>
              setFormData({ ...formData, teamName: e.target.value })
            }
            required
          />
          <input
            className="bg-blue-500"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <input
            className="bg-yellow-500"
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            required
          />

          <button type="submit">Save team</button>
        </div>

        <textarea
          className="bg-red-500 resize-none"
          rows="70"
          cols="75"
          placeholder="Paste your Pokémon team here..."
          autoFocus
          value={formData.team}
          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
          required
        />
      </form>
    </div>
  );
}

export default InputTeam;
