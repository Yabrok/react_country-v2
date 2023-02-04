import { useEffect, useState, useRef, useContext } from "react";
import { Content } from '../../components/Content'
import { ThemeContext } from "../../context/ThemeContext";
import '../Home/main.css'

export const Home = () => {
  const { theme } = useContext(ThemeContext)
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

    <div className={`${theme}`}>
      <div className={`container`}>
        <section className="hero py-5">
          <div className="container">
            <form onSubmit={handleChange} className="d-flex justify-content-between">
              <div className="w-50 input-group">
                <input ref={search} className='form-control' type="text" placeholder="Search country..." />
                <button type="submit" className="btn btn-success">Search</button>
              </div>
              <select ref={select} onChange={handleSelect} className='form-select w-25'>
                <option defaultValue value='all'>All</option>
                <option value='Europe'>Europe</option>
                <option value='Antarctic'>Antarctic</option>
                <option value='Oceania'>Oceania</option>
                <option value='Asia'>Asia</option>
                <option value='Africa'>Africa</option>
                <option value='Americas'>Americas</option>
              </select>
            </form>
          </div>
        </section>
        {countries.isLoading ? <h1>Loading...</h1> : ''}
        {countries.isError ? <h1>{countries.isError}</h1> : ''}
        {countries.data.length ? (
          <ul className="row gy-4 list-unstyled">
            {
              countries.data.map((item, index) => {
                return (
                  <Content index={index} obj={item} />
                )
              })
            }
          </ul>
        ) : ('')}
      </div>
    </div>
  )
}