import { Link } from "react-router-dom"

export const Content = ({ obj, index }) => {

  return (
    <li key={index} className="col-12 col-md-4 col-lg-4">
      <Link to={`/info/` + obj.name.common} style={{'text-decoration': 'none', 'border': 'none'}}>
        <div className="card">
          <img src={obj.flags.svg} className="card-img-top" alt="..." width='100%' height='200px' />
          <div className="card-body">
            <h5 className="card-title fw-bold text-dark">
              {obj.name.common}
            </h5>
            <p className="card-text mb-1 text-dark" >
              Population: {obj.population}
            </p>
            <p className="card-text mb-1 text-dark">
              Region: {obj.region}
            </p>
            <p className="card-text mb-1 text-dark">
              Capital: {obj.capital}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}


