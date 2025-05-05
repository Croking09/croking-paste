import { Routes, Route } from 'react-router-dom';

import PokemonTeam from "../pokemon/PokemonTeam.jsx";
import InputTeam from "../pokemon/InputTeam.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/croking-paste/" element={<InputTeam />} />
        <Route path="/croking-paste/:id" element={<PokemonTeam />} />
      </Routes>
    </div>
  );
}

export default App;
