
import { useEffect, useState } from "react";
import useFetchAPIhook from '../Hooks/HttpFetchHook.js'
import MovieCard from './MovieCard/movieCard'
import {CircularProgress} from '@mui/material'
import CustomPagination from './CustomPagination/CustomPagination.js'
import Filters from './Filters/Filters.js'

export default function Series() {
    const [page, setPage] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState('');
    const {loading, data, error} = useFetchAPIhook(`https://api.themoviedb.org/3/discover/tv?api_key=52c34330a05320a7628d303efe0e4a87&page=${page}&language=en-US`)
    const loader = loading ? <CircularProgress color="secondary" /> : ''

    const getSelectedGenres = (selectedGen) => {
        selectedGen = selectedGen.map(el => el.id);
        selectedGen = selectedGen.join();
        setSelectedGenres(selectedGen);
    }
    return (<>
        <div>{loader}</div>
        <Filters type="tv" sendSelectedGenres={getSelectedGenres}/>
        <div className="trending" style={ {
            padding: '20px',
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
        }}>
            {data && data.map(movie => <MovieCard 
            posterPath={movie.poster_path} 
            name={movie.original_name || movie.original_title}
            votes={movie.vote_average} mediaType={'tv'} id={movie.id}/>)}
        </div>
        <CustomPagination setPage={setPage}/>
    </>)
}