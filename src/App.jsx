import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState("")

  const passwordRef = useRef(null)
  
  
  const generatePassword = useCallback(() => {
    
    let pass =""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '~`!@#$%^&*()-_=+{}[]?<>';


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)


  }, [length, numAllowed, charAllowed, setPassword])

  const copytoClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    setTimeout(() => {
      setInterval(() => {
        setCopied("")
      }, 3000);
      setCopied("Copy to clipboard")
    }, 500)
  },[password])

  useEffect(()=>{
    generatePassword()
  },[length, numAllowed, charAllowed, generatePassword])

  
  return (
    <>
      <div
        className="container mx-auto bg-slate-600 rounded-md p-5 mt-10"
      >

        <h1
          className='text-white text-center text-2xl font-medium mb-5 '
        >Password Generator</h1>

        <input type="text"
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef}

          className='d-flex mx-auto w-5/6 p-2 outline-none' />

        <button
          onClick={copytoClipboard}
          className='bg-blue-500 p-2 text-white rounded-r-lg w-20 '
        >Copy</button>

        
        <div className="bottom flex mt-5">

          <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
          />

          <label
            className='ml-4 text-white'
          >Length: {length}</label>



          <div className="chknum">

            <input type="checkbox"
              className='ml-4'
              defaultChecked = {numAllowed} 
              id='numInput'
              onChange={()=>setnumAllowed((prev)=> !prev)}
            />
            <label
              htmlFor='numInput'
              className='text-white ml-2'
            >Number</label>
          </div>



          <div className="chkchar">

            <input type="checkbox"
              className='ml-4'
              defaultChecked = {charAllowed} 
              id='charInput'
              onChange={()=>setcharAllowed((prev)=> !prev)}
            />
            <label
              htmlFor='charInput'
              className='text-white ml-2'
            >Character</label>
          </div>

        </div>
        <p
          className='text-green-500 text-center my-4'
        >{copied}</p>
      </div>
    </>
  )
}

export default App
