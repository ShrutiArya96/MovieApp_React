import { useEffect, useState } from "react";
import useFetchAPIhook from '../../Hooks/HttpFetchHook.js'
import MovieCard from '../MovieCard/movieCard'
import {CircularProgress} from '@mui/material'
import Search from "../Search.js";
import CustomPagination from '../CustomPagination/CustomPagination.js'
import './Trending.css'

 export default function Trending() {
    const api_key = '52c34330a05320a7628d303efe0e4a87';
    let baseURL = `https://api.themoviedb.org/3/`;
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    if(searchText && searchText.length > 0) {
        baseURL += `search/multi?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    } else {
        baseURL += `trending/all/week?api_key=${api_key}&page=${page}`
    }
    const fetchSearchedMovies = async (searchText) => {
        setSearchText(searchText);
    }
    const {loading, data, error} = useFetchAPIhook(baseURL)
    const loader = loading ? <CircularProgress color="secondary" /> : ''
    return (<>
        <div>{loader}</div>
        <div className="searchBar" style={{"display": "flex","justifyContent": "flex-end","marginTop": "12px", 'marginRight': '28px'}}>
            <Search fetchSearch={fetchSearchedMovies}/>
        </div>
        <div className="trending">
            {data && data.map(movie =><MovieCard 
            posterPath={movie.poster_path} 
            name={movie.original_name || movie.original_title}
            id={movie.id}
            votes={movie.vote_average} mediaType={movie.media_type == 'movie' ? 'movie' : 'tv'}/>)}
        </div>
        <CustomPagination setPage={setPage}/>
    </>)
}
