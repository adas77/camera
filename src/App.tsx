import { useState } from 'react'
import Camera from './Camera'
import { rand2 } from './data'

function App() {
  const data = rand2(6, 150)
  const [menu, setMenu] = useState(true)
  return (
    <>
      <Camera rects={data} setMenu={setMenu} />
      {menu
        ?
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className='font-bold mb-12 text-3xl'>Naciśnij dowolny przycisk aby zagrać</p>
          <p className='font-bold mt-1'>Sterowanie</p>
          <ul className='mt-2'>
            <li><b>0</b> - Początkowa pozycja</li>
            <li><b>m</b> - Powrót do Menu</li>
            <li><b>w</b> - Góra</li>
            <li><b>s</b> - Dół</li>
            <li><b>a</b> - Lewo</li>
            <li><b>d</b> - Prawo</li>
            <li><b>f</b> - Przód</li>
            <li><b>b</b> - Tył</li>
            <li><b>x</b> - Rotacja OX</li>
            <li><b>1</b> - Rotacja OX - kierunek przeciwny</li>
            <li><b>y</b> - Rotacja OY</li>
            <li><b>2</b> - Rotacja OY - kierunek przeciwny</li>
            <li><b>z</b> - Rotacja OZ</li>
            <li><b>3</b> - Rotacja OZ - kierunek przeciwny</li>
          </ul>
          <div className='mt-8 ml-8 font-bold text-cyan-700 text-xl'>
            <b><a href='https://github.com/adas77/camera'>Kod źródłowy</a></b>
          </div>
        </div>
        :
        <button
          onClick={() => {
            window.location.reload()
          }}
          className="absolute top-5 left-10 ">Menu
        </button>
      }
    </>
  )
}

export default App
