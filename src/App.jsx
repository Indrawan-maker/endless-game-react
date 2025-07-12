import { useState } from 'react'
import Header from "./Header"
import Languange from './Languange'
import Btn from './Btn'
import { nanoid } from 'nanoid'

export default function App() {
const btnClass = [
  "dip1", "dip2", "dip3", "dip4", "dip5",
  "dip6", "dip7", "dip8", "dip9", "dip10",
  "dip11", "dip12", "dip13", "dip14", "dip15",
  "dip16", "dip17", "dip18", "dip19", "dip20",
  "dip21", "dip22", "dip23", "dip24", "dip25",
  "dip26"
]



  const [btnValue, setBtnValue] = useState( Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
))

const buttonElement = btnValue.map((val, i) => (
  <Btn key={i} className={btnClass[i]} value={val} />
))



  return (
    <main>
    <Header />
    <Languange/>
    <div className='wrapper-input'>
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    <input type="text" />
    </div>

{buttonElement}







    </main>
  )
}
