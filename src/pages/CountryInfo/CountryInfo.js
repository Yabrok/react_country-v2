import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


export const CountryInfo = () => {
  const { name } = useParams()
  const [info, setInfo] = useState(
    {
      isLoading: false,
      data: [],
      isError: ''
    }
  )

  useEffect(() => {
    setInfo({
      ...info,
      isLoading: true
    })
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((data) => {
        if (data.status == 200) {
          setInfo({
            ...info,
            isLoading: false,
            data: data.data,
            isError: ''
          })
        }
      })
      .catch((err) => {
        if (err) {
          setInfo(
            {
              ...info,
              isLoading: false,
              isError: err.message
            }
          )
        }
      })
  }, [])

  const navigate = useNavigate()
  return (
    <>
      {info.isLoading ? <h1>Loading...</h1> : ''}
      {info.isError ? <h1>{info.isError}</h1> : ''}
      {info.data.length ? (
        <div className="container pt-5">
          <button onClick={() => navigate(-1)} className="btn btn-secondary mb-5">Back</button>
          {
            info.data?.map((info) => {
              return (
                <div key={info.name?.common} className="d-flex align-items-center mb-5">
                  <img className="rounded-3" src={info.flags?.svg} width='560px' height='401px' />
                  <div className="ms-5">
                    <h2 className="h1 fw-bold mb-4">{info.name?.common}</h2>
                    <div className="d-flex">
                      <div>
                        <p
                          className="mb-2"><span className="fw-bold">Native Name: </span>
                          {info.name?.official}
                        </p>
                        <p className="mb-2"><span className="fw-bold">Population: </span>
                          {info.population}
                        </p>
                        <p className="mb-2"><span className="fw-bold">Region: </span>
                          {info.region}
                        </p>
                        <p className="mb-2"><span className="fw-bold">Sub Region: </span>
                          {info.subregion}
                        </p>

                      </div>
                      <div className="ms-5">
                        <p className="mb-2"><span className="fw-bold">Capital: </span>
                          {info.capital}
                        </p>
                        <p className="mb-2"><span className="fw-bold">Top Level Domain: </span>
                          {info.tld}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      ) : ('')}

    </>
  )
}

// Native Name: België
// Population: 11, 319, 511
// Region: Europe
// Sub Region: Western Europe
// Capital: Brussels