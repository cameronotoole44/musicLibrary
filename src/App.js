import './App.css';
import { useState, Suspense, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import Spinner from './components/Spinner';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';
import { createResource as fetchData } from './helper';

const App = () => {
  const searchInput = useRef('');
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('Search for Music!');

  const handleSearch = async (e, term) => {
    console.log()
    e.preventDefault()
    setMessage('Loading...')
    try {
      const fetchedData = fetchData(term, 'main')
      setData(fetchedData)
      setMessage('')
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessage('Error fetching data')
    }
  };

  const renderGallery = () => {
    if (data) {
      try {
        const resource = data.result.read()
        return (
          <Suspense fallback={<Spinner />}>
            <Gallery data={resource} />
          </Suspense>
        );
      } catch (e) {
        if (e instanceof Promise) {
          return <Spinner />
        } else {
          console.error('Error reading data:', e)
          return <div>Error loading data</div>
        }
      }
    } else {
      return <div>{message}</div>;
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchContext.Provider value={{ term: searchInput, handleSearch: handleSearch }}>
                  <SearchBar />
                </SearchContext.Provider>
                <DataContext.Provider value={data}>
                  {renderGallery()}
                </DataContext.Provider>
              </>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;



