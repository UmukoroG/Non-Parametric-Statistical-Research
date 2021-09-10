import {useState } from 'react';
import './App.css';
import Axios from 'axios';
import Image from './Components/Image';

function App() {
  const [search, setSearch]=useState("") 
  const [images, setImages]=useState([])

  
  var url=`https://images-api.nasa.gov/search?q=${search} `

  async function getImages(){
    var result= await Axios.get(url);
    setImages(result.data.collection.items)
    console.log(result.data.collection.items)
  }
  const onSubmit =(e)=>{
    e.preventDefault();
    getImages();

  }


  return (
    <div className="app">
      <h1>nasa api</h1>
      <form onSubmit={onSubmit} >
      <input type='text'
        className="app_input" 
        placeholder='search...'
        value={search} onChange={(e)=> setSearch(e.target.value)}
        />

        <input type="submit"
        value="search"
        />

      </form>

      <div>
        {images.map(image=>{
          return <Image image={image}/>
        })}

      </div>
      


    </div>
  );
}

export default App;
