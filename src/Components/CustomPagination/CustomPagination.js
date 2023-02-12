import {Pagination} from '@mui/material'
export default function CustomPagination({setPage}) {
  function onChangeHandler(event, page) {
    setPage(page);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        margin: '30px',
      }}
    >

      <Pagination count={10} variant="outlined" onChange={(event, page) => onChangeHandler(event, page)}/>
    </div>
  )  
}