import { Header } from './components/Header'
import { Home } from './pages/Home'
import { CountryInfo } from "./pages/CountryInfo/CountryInfo";
import { Error } from './pages/Error/Error'
import './assets/style/index.css'
import { Route, Routes } from "react-router-dom";

import { useEffect, useState, useRef } from "react";


function App() {
  const [countries, setCountries] = useState({
    isLoading: false,
    data: [],
    isError: ''
  })
  useEffect(() => {
    setCountries({
      ...countries,
      isLoading: true,
    })
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then((data) => {
        if (data) {
          setCountries({
            ...countries,
            isLoading: false,
            data: data
          })
        }
      })
      .catch((err) => {
        if (err) {
          setCountries({
            ...countries,
            isLoading: false,
            data: [],
            isError: err.message
          })
        }
      })
  }, [])

  const search = useRef('')

  function handleChange(evt) {
    evt.preventDefault()
    let searchValue = search.current.value;
    setCountries({
      ...countries,
      isLoading: true,
    })
    fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
      .then(res => res.json())
      .then((data) => {
        if (data) {
          setCountries({
            ...countries,
            isLoading: false,
            data: data
          })
        }
      })
      .catch((err) => {
        if (err) {
          setCountries({
            ...countries,
            isLoading: false,
            data: [],
            isError: err.message
          })
        }
      })
  }

  let select = useRef('')
  function handleSelect() {
    setCountries({
      ...countries,
      isLoading: true,
    })
    const region = select.current.value

    if (region != 'all') {
      fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then((data) => {
          if (data) {
            setCountries({
              ...countries,
              isLoading: false,
              data: data,
              isError: ''
            })
          }
        })
        .catch((err) => {
          if (err) {
            setCountries({
              ...countries,
              isLoading: false,
              data: [],
              isError: err.message
            })
          }
        })
    } else {
      setCountries({
        ...countries,
        isLoading: true,
      })
      fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then((data) => {
          if (data) {
            setCountries({
              ...countries,
              isLoading: false,
              data: data
            })
          }
        })
        .catch((err) => {
          if (err) {
            setCountries({
              ...countries,
              isLoading: false,
              data: [],
              isError: err.message
            })
          }
        })
    }
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/info/:name' element={<CountryInfo />} />
        <Route path='*' element={<Error />} />
      </Routes>

    </>
  );
}

export default App;
