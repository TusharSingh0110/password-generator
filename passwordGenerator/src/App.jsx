import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg px-6 py-6 bg-gray-800 text-orange-400">
        <h1 className="text-white text-2xl font-bold text-center my-4">Password Generator</h1>

        <div className="flex items-center justify-between shadow-md rounded-lg overflow-hidden mb-6 border border-gray-700">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 bg-gray-700 text-white text-lg"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 text-white px-5 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <label className="text-white font-semibold">Password Length: {length}</label>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="w-full ml-4"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white font-semibold">Include Numbers</label>
            <input
              type="checkbox"
              checked={numberAllowed}
              className="h-5 w-5 accent-orange-500"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white font-semibold">Include Special Characters</label>
            <input
              type="checkbox"
              checked={charAllowed}
              className="h-5 w-5 accent-orange-500"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full mt-6 bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-700 transition"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
