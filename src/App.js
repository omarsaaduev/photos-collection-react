import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './Collection';

const categories = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]


function App() {
  const [collections, setCollections] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : '' 

    fetch(`https://654bcc145b38a59f28efba27.mockapi.io/photo?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => setCollections(json))
    .catch((err) =>{
      console.warn(err)
      console.log('Ошибка при получении данных')
    }).finally(() => setIsLoading(false))
  },[categoryId, page])


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i, ) => (
            <li key={obj.name} onClick={() => setCategoryId(i)} className={categoryId===i? 'active' : ''}>{obj.name}</li>
          ))}
        </ul>
        <input 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input" 
            placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? <h1>Идет загрузка...</h1> : 
          collections.filter((obj) => {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase())
          })
          .map((obj, index) => (
            <Collection
            key = {index}
            name={obj.name}
            images={obj.photos}
          />
          ))
        }
        
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((items, i) => (
            <li onClick={() => setPage(i+1)} className={page===i+1? 'active' : ''}>{i+1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
