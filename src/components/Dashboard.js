import { useState } from 'react'
import { Box } from '@mui/material'
import './Dashboard.css'

const Dashboard = () => {
  const [genres, setGenres] = useState(['All'])

  const allGenres = [
    { label: 'All', value: 'All' },
    { label: 'MEN', value: 'MEN' },
    { label: 'WOMEN', value: 'WOMEN' },
    { label: 'KIDS', value: 'KIDS' },
    { label: 'HOME & LIVING', value: 'HOME & LIVING' },
  ]

  const toggleValueInList = (array, value) => {
    if (array.includes(value)) {
      //If true, remove the value and update the state
      const newArray = array.filter((e) => e !== value)
      return newArray
    } else {
      //Else Add the selected value and update the state
      const newArray = [...array, value]
      return newArray
    }
  }

  const handleGenreChange = (genre) => {
    const all = 'All'
    const newGenreValue = genre.value

    if (newGenreValue === all) {
      setGenres([all])
    } else {
      //return us the array of genres without "All" in it
      const genreWithoutAll = genres.filter((item) => item !== all)

      const nextGenres = toggleValueInList(genreWithoutAll, newGenreValue)
      setGenres(nextGenres)

      if (nextGenres.length === 0) {
        setGenres([all])
      }
    }
  }
  return (
    <div className="tool-bar">
      {allGenres.map((genre) => (
        <Box
          key={genre.value}
          className={
            genres.includes(genre.value)
              ? 'genre-btn active-toolbar-button'
              : 'genre-btn'
          }
          onClick={() => handleGenreChange(genre, genres)}
        >
          {genre.value}
        </Box>
      ))}
    </div>
  )
}
export default Dashboard
