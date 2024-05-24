import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(10);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed)  
        str += "0123456789"
    if(charAllowed)
      str += "!@£$%^&*"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])
  
  const copyPassToClipboard = useCallback( () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  } , [password])
  
  useEffect(()=>{passwordGenerator()}, [length, numAllowed , charAllowed])

  return (
    <>
    <div style={{textAlign : "center", justifyContent: "center", backgroundColor: '#F8DFFF', width:"50%", marginLeft:"200px", padding:"20px"}}>
      <h1 className="text-4xl font-bold italic">Password Generator</h1>
      <input type="text" name="txtPassword" id="txtPassword" ref={passwordRef} readOnly value={password} />
      <button type='button' name='btnCopy' onClick={copyPassToClipboard}>Copy Password</button>
      <input 
        type="range" 
        name="length" 
        id="length" 
        value={length} 
        min={6} max={30} 
        onChange={(e) => {setLength(e.target.value)}} />
        <label htmlFor='length'>Length: {length}</label>
      <input 
        type="checkbox" 
        name="isNumeric" 
        id="isNumeric" 
        onChange={() => {setNumAllowed((prev) => !prev)}}  
        />
        <label htmlFor='isNumeric'>Numeric</label>
      <input 
        type="checkbox" 
        name="isSpecialChars" 
        id="isSpecialChars" 
        onChange={() => {setCharAllowed((prev) =>!prev)}}  /><label>Special Characters</label>
      </div>
    </>
  )
}

export default App
