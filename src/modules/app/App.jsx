import { Routes, Route } from "react-router-dom";

import PokemonTeam from "../pokemon/PokemonTeam.jsx";
import InputTeam from "../pokemon/InputTeam.jsx";

function App() {
  return (
    <div className="bg-pattern">
      <Routes>
        <Route path="/" element={<InputTeam />} />
        <Route path="/:id" element={<PokemonTeam />} />
      </Routes>
    </div>
  );
}

export default App;
