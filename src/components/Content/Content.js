export const Content = ({obj, index}) => {

  return (
    <li key={index} className="col-12 col-md-4 col-lg-4">
      <div className="card">
        <img src={obj.flags.svg} className="card-img-top" alt="..." width='100%' height='200px' />
        <div className="card-body">
          <h5 className="card-title fw-bold">
            {obj.name.common}
          </h5>
          <p className="card-text mb-1">
            Population: {obj.population}
          </p>
          <p className="card-text mb-1">
            Region: {obj.region}
          </p>
          <p className="card-text mb-1">
            Capital: {obj.capital}
          </p>
        </div>
      </div>
    </li>
  )
}


