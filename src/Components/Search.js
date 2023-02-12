import { useEffect, useState } from "react";
import {TextField, InputAdornment} from "@mui/material"
import { RiSearchLine, RiCloseLine } from "react-icons/ri"


export default function Search({fetchSearch}) {
    const [searchtext, setSearchText] = useState('');
    const [debounceSearch, setdebounceSearch] = useState(null);

    function debounceSearchMovies() {
        let timer = null;
        return function(evt) {
            setSearchText(evt.target.value);
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                searchParam(evt); 
            }, 400)
        }
    }

    useEffect(() => {
        let func = debounceSearchMovies();
        setdebounceSearch(() => func);
    }, [])


    const searchParam = (evt) => {
        fetchSearch(evt.target.value);
    }

    const clearSearch = () => {
        setSearchText('');
        fetchSearch('');
    }

    return (
        <>
            <TextField
                label="Search movies/series"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '50%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><RiSearchLine/></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><RiCloseLine onClick={clearSearch}/></InputAdornment>,
                }}
                onChange={debounceSearch}
                value={searchtext}
            />
        </>
    )
}