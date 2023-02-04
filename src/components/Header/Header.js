import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import '../main.css'


export const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <header>
      <header className={`${theme} py-4 shadow-lg`}>
        <div className='container'>
          <div className="d-flex align-items-center">
            <h1 className="m-0 fw-bold h3">
              Where in the world?
            </h1>

            <button className='ms-auto' onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}> 
            {theme == 'light' ? 'Dark' : 'Light'} Mode</button>
        </div>
      </div>
    </header>
      </header >
  )
}