import React from 'react'
import Grid from '@mui/material/Grid2'
import { Typography } from '@mui/material'

const Home = () => {
  return (
    <Grid container xs={12} sx = {{margin: '3px', display:'flex', flexDirection:'column', background:'silver'}}>
    <Grid sx = {{display:'flex', justifyContent:'center'}}><Typography>Home</Typography></Grid>
        <Grid sx = {{border:'2px solid violet', background:'indigo'}}>main Title</Grid>
        <Grid sx = {{border:'2px solid blue', background:'green'}}>Card1</Grid>
        <Grid sx = {{border:'2px solid yellow', background:'orange'}}>subTitle</Grid>
        <Grid sx = {{border:'2px solid red', background:'violet'}}>Card2</Grid>
        <Grid sx = {{border:'2px solid indigo', background:'blue'}}>Footer</Grid>
    </Grid>
  )
}

export default Home