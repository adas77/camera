import { useState } from "react";
import Camera from "./Camera";
import { basic, grow, rand1, rand2 } from "./data";

export function Prompt() {
  return (
    <div>
      <p className="font-bold mb-4 text-l">Sterowanie</p>
      <ul>
        <li>
          <b>SPACJA</b> - Zmień tryb wyświetlania
        </li>
        <li>
          <b>u</b> - Zoom In
        </li>
        <li>
          <b>i</b> - Zoom Out
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
    </div>
  );
}

type ChooseDataProps = {
  data: Data;
  dataSet: Data[];
  setData: React.Dispatch<React.SetStateAction<Data>>;
};
export function ChooseData({ data, dataSet, setData }: ChooseDataProps) {
  return (
    <select className="block focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700">
      <option defaultValue={data.label}>{data.label}</option>
      {dataSet
        .filter((d) => d.label !== data.label)
        .map((d) => (
          <option onClick={() => setData(d)} key={d.label} value={d.label}>
            {d.label}
          </option>
        ))}
    </select>
  );
}

function App() {
  const dataSet: Data[] = [
    { rects: rand1(4, 20), label: "Random 1" },
    { rects: rand2(4, 500), label: "Random 2" },
    { rects: grow(12), label: "Grow" },
    { rects: basic(), label: "Basic" },
  ];
  const [menu, setMenu] = useState(true);
  const [data, setData] = useState(dataSet[0]);
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
          <br />
          <a
            className="font-bold text-cyan-700 text-xl"
            href="https://github.com/adas77/camera"
          >
            Kod źródłowy
          </a>
        </div>
      ) : (
        <Camera data={data} dataSet={dataSet} setData={setData} />
      )}
    </>
  );
}

export default App;
