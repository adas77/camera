import { useState } from "react";
import Camera from "./Camera";
import { rand2 } from "./data";

export function Prompt() {
  return (
    <>
      <p className="font-bold mt-1">Sterowanie</p>
      <ul className="mt-2">
        <li>
          <b>SPACJA</b> - Zmień tryb wyświetlania
        </li>
        <li>
          <b>-</b> - Reset Zoom
        </li>
        <li>
          <b>0</b> - Początkowa pozycja
        </li>
        <li>
          <b>m</b> - Powrót do Menu
        </li>
        <li>
          <b>u</b> - Zoom In
        </li>
        <li>
          <b>i</b> - Zoom Out
        </li>
        <li>
          <b>w</b> - Góra
        </li>
        <li>
          <b>s</b> - Dół
        </li>
        <li>
          <b>a</b> - Lewo
        </li>
        <li>
          <b>d</b> - Prawo
        </li>
        <li>
          <b>f</b> - Przód
        </li>
        <li>
          <b>b</b> - Tył
        </li>
        <li>
          <b>x</b> - Rotacja OX
        </li>
        <li>
          <b>1</b> - Rotacja OX - kierunek przeciwny
        </li>
        <li>
          <b>y</b> - Rotacja OY
        </li>
        <li>
          <b>2</b> - Rotacja OY - kierunek przeciwny
        </li>
        <li>
          <b>z</b> - Rotacja OZ
        </li>
        <li>
          <b>3</b> - Rotacja OZ - kierunek przeciwny
        </li>
      </ul>
    </>
  );
}

function App() {
  const data = rand2(6, 150);
  const [menu, setMenu] = useState(true);
  window.addEventListener("keydown", (_key) => {
    setMenu(false);
  });
  return (
    <>
      {menu ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="font-bold mb-12 text-3xl">
            Naciśnij dowolny przycisk aby zagrać
          </p>
          <Prompt />
          <div className="mt-8 ml-8 font-bold text-cyan-700 text-xl">
            <b>
              <a href="https://github.com/adas77/camera">Kod źródłowy</a>
            </b>
          </div>
        </div>
      ) : (
        <Camera rects={data} />
      )}
    </>
  );
}

export default App;
