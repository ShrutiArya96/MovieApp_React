import { useEffect, useState } from "react";
import useFetchAPIhook from '../Hooks/HttpFetchHook.js'
import MovieCard from './MovieCard/movieCard'
import Search from "./Search.js";
import {CircularProgress} from '@mui/material'
import Grid from '@mui/material/Grid';
import CustomPagination from './CustomPagination/CustomPagination.js'
import Filters from './Filters/Filters.js'

 export default function Movies() {
    const api_key = '52c34330a05320a7628d303efe0e4a87';
    let baseURL = `https://api.themoviedb.org/3/`;

    const [page, setPage] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState('');
    const [searchText, setSearchText] = useState('');

    if(searchText && searchText.length > 0) {
        baseURL += `search/movie?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    } else {
        baseURL += `discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    }
    if(selectedGenres && selectedGenres.length > 0) {
        baseURL += `&with_genres=${selectedGenres}`;
    }

    const {loading, data, error} = useFetchAPIhook(baseURL);
    const loader = loading ? <CircularProgress color="secondary" /> : ''
    console.log(data);
    const getSelectedGenres = (selectedGen) => {
        selectedGen = selectedGen.map(el => el.id);
        selectedGen = selectedGen.join();
        setSelectedGenres(selectedGen);
    }


    const fetchSearchedMovies = async (searchText) => {
        setSearchText(searchText);
    }

    const setPageAndScroll = (page) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(page);
        
    }

    return (<>
        <div>{loader}</div>
        <div className="searchBar" style={{"display": "flex","justifyContent": "flex-end","marginTop": "12px", 'marginRight': '28px'}}>
            <Search fetchSearch={fetchSearchedMovies}/>
        </div>
        <Grid container spacing={1}>
            <Grid item xs={2}>                
                    <Filters type="movie" sendSelectedGenres={getSelectedGenres}/>
            </Grid>
            <Grid item xs={10}>
                <div className="trending" style={ {
                    padding: '20px',
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                }}>       
                    {data && data.map(movie => <MovieCard 
                    posterPath={movie.poster_path} 
                    name={movie.original_name || movie.original_title}
                    votes={movie.vote_average} mediaType={'movie'}
                    id={movie.id}
                    />)}
                </div>
                <CustomPagination setPage={setPageAndScroll}/> 
            </Grid>
        </Grid>
    </>)
}
