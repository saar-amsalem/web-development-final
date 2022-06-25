import data from "./data";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
    <div>
      <header>
        <a href="/">Sharmutut BaHam</a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
        
      </main>
    </div>
    </BrowserRouter>
  );
}


export default App;
