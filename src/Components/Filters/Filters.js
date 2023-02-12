import { useEffect, useState } from 'react';
import './Filters.css'
import useFetchAPIhook from '../../Hooks/HttpFetchHook.js'
import {Chip} from '@mui/material'

export default function Filters({type, sendSelectedGenres}) {
    let {loading, data, error} = useFetchAPIhook(`https://api.themoviedb.org/3/genre/${type}/list?api_key=52c34330a05320a7628d303efe0e4a87`)
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        if(data && data.length > 0) {
            data = data.map(genre => ({...genre, selected:false}));
            setGenres(data);
        }
    }, [data])

    const filterGenres = (evt, genre) =>{
        let dataList = JSON.parse(JSON.stringify(genres))
        let current = dataList.find(el => el.name == genre.name);
        current.selected = !current.selected;
        let selectedGenres = dataList.filter(el => el.selected);
        setGenres(dataList);
        sendSelectedGenres(selectedGenres);
    }

    return (
        <div style={{"marginTop":'30px'}}>
        {genres && genres.map(genre => <Chip label={genre.name} style={{'margin': '5px'}} color="success" variant={genre.selected ? '':"outlined"} onClick={(evt) => filterGenres(evt, genre)} />)}
        </div>
    )

}