import './movieCard.css'
import Card from '@mui/material/Card';
import {RiCloseLine, RiYoutubeLine} from "react-icons/ri";
import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import { img_300, img_500, unavailable } from "../../config";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function MovieCard({posterPath, name, mediaType, votes, id}) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '70%',
    width: "80%",
    bgcolor: '#252424',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '3px',
    p: 4,
  };
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  const handleDragStart = (e) => e.preventDefault();

    const [open, setOpen] = useState(false);
    const [mediaDetail, setMediaDetail] = useState(null);
    const [date, setdate] = useState({month:'', year:''})
    const [credits, setCredit] = useState(null)
    const [video, setVideo] = useState(null);

    const handleOpen = () => {
      getMovieDetails();
      fetchCredits();
      fetchVideo();
      setOpen(true);
    }
    const handleClose = () => setOpen(false);

    async function getMovieDetails() {
      var data = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=52c34330a05320a7628d303efe0e4a87`);
      data = await data.json();
      data.release_date = formatDate(data.release_date);
      setMediaDetail(data);
    }

    async function fetchCredits() {
      let data = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=52c34330a05320a7628d303efe0e4a87`
      );
      data = await data.json();
      setCredit(data.cast);
    };

    async function fetchVideo() {
      let data = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=52c34330a05320a7628d303efe0e4a87`
      );
      data = await data.json(); 
      setVideo(data.results[0]?.key);
    };
    function formatDate(date) {
      let dt = new Date(date);
      let year = dt.getFullYear();
      let month = dt.getMonth();
      setdate({month: month, year: year});
    }

    const carouselItems = credits && credits.map((c) => (
      <div className="carouselItem">
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : unavailable}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    ));

    return ( 
      <Card sx={{ maxWidth: 345 }} raised={true} style={{'width': '23%', 'margin': '10px'}}>
          <CardMedia
          component="img"
          alt="green iguana"
          height="390"
          image={posterPath
              ? `${img_300}${posterPath}` : unavailable}
        />
        <div onClick={handleOpen}>
          <CardContent>       
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" >
                {mediaType}
            </Typography>
            <Chip label={votes} color="success" variant="outlined" />
          
          </CardContent>
        </div>
        {mediaDetail && <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
         <Button variant="text" onClick={()=>setOpen(false)} style={{'position': 'absolute', "marginLeft": '92%'}} className="closeButton"><RiCloseLine /></Button>
            <div className='modalBody'>
              <img
                  src={
                    posterPath
                      ? `${img_500}/${posterPath}`
                      : unavailable
                  }
                  alt={name}
                  className="ContentModal__portrait"
                />
              <div className='modalSub'>
                <Typography id="modal-modal-title" variant="h7" component="h2">
                  {name} <Chip style={{marginLeft: '20px'}} label={votes} color="success"  />
                </Typography>
                {date.month && date.year ?  <Typography id="modal-modal-title" sx={{ mt: 2 }}>
                 <span className='title'> Release Date - </span>{date.month} {date.year}
                  </Typography> : ''}
                <Typography id="modal-modal-title" sx={{ mt: 2 }}>
                <span className='title'>Genres - </span>
                  {
                    mediaDetail.genres.map(gen => {
                      return <span>{ gen.name }, </span>
                    })
                  }
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {mediaDetail.overview}
                </Typography>
                <div className='carousel'>
                  <span className='title'> Cast - </span>
                  {carouselItems && <AliceCarousel
                    mouseTracking
                    infinite
                    disableDotsControls
                    disableButtonsControls
                    responsive={responsive}
                    items={carouselItems}
                    autoPlay
                  />}
                </div>
                 <Button
                    variant="contained"
                     startIcon={<RiYoutubeLine />}
                    color="success"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                </Button>
              </div>
            </div>
          </Box>
        </Modal>}
      </Card>      
    );
}