import './Header.css';
import TextField from '@mui/material/TextField';
import {Link, NavLink} from 'react-router-dom';
export default function Header() {
    return (
        <div className='header-container'>
            <h4 style={{margin: '0px'}} className="logo">
                Show HUB 🍿
            </h4>
            
            <div className='navLinks'>
                <NavLink to="/" activeClassName="active" className='headerLink'>Home</NavLink>
                <NavLink to="/Movies" className='headerLink' >Movies</NavLink>
                <NavLink to="/Series" className='headerLink' >Series</NavLink>
            </div>
        </div>
    )
}