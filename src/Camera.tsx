import { useEffect, useRef, useState } from "react";
import { ChooseData, Prompt } from "./App";
import { DEPTH } from "./consts";
import { getCtx, handleOnKey, rerender } from "./lib/draw";

type Props = {
  data: Data;
  dataSet: Data[];
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

const Camera = ({ data, dataSet, setData }: Props) => {
  const [pos, setPos] = useState<Point[][]>(data.rects);
  const [painted, setPainted] = useState(true);
  const [depth, setDepth] = useState(DEPTH);
  const [showPrompt, setShowPrompt] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    const res = handleOnKey(e.key, pos, data.rects, setDepth, setPainted);
    if (res) setPos(res);
  };

  useEffect(() => {
    const ctx = getCtx(ref);
    rerender(ctx, pos, painted, depth);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pos, depth, painted, setPainted, data, setData]);

  useEffect(() => {
    setPos(data.rects);
  }, [data, setData]);

  return (
    <>
      <div className="absolute top-5 left-10 flex gap-8">
        <div className="flex gap-2">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Menu
          </button>
          <button
            onMouseOver={() => setShowPrompt(true)}
            onMouseOut={() => setShowPrompt(false)}
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700"
          >
            Show Prompt
          </button>
          <ChooseData data={data} dataSet={dataSet} setData={setData} />
        </div>
        <div className="flex gap-1">
          <button
            disabled
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Depth: {depth}
          </button>
          <button
            disabled
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Mode: {painted ? "Linie" : "Połączone"}
          </button>
        </div>
      </div>
      {showPrompt && (
        <div className="absolute top-24 left-10">
          <Prompt />
        </div>
      )}
      <canvas width={window.innerWidth} height={window.innerHeight} ref={ref} />
    </>
  );
};

export default Camera;
