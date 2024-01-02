
import React from "react"
import './App.css';
import Form from "./Form.js"


function App() {
  const [text,setText] = React.useState("")
  const [number,setNumber] = React.useState("")
  return (
    <div className="App">
      <h1>Fresh Buyzar</h1>
      <h2>Billing Details</h2>
      <form className = "customer-info">
  <label>
    Name:
    <input type="text" name="name" onChange={(e)=>setText(e.target.value)} />
  </label>
  <label>
    Phone:
    <input type="text" name = "phone" onChange={(e)=>setNumber(e.target.value)}/>
  </label>
  </form>



  <h4>Name-{text}</h4>
  <h4>Phone-{number.length===10?number:"please provide correct number"}</h4>
   <Form/>
   



  

    </div>
  );
}

export default App;
