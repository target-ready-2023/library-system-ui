import { Card } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import React from 'react';
import { Grid } from '@mui/material'
import image1 from "../../images/image3.png"
import image2 from "../../images/image2.png"
import image3 from "../../images/image1.png"
import './movingCarousal.css';


const Home = () => {
    var items = [
        
        {
            image:`${image1}`, 
            name: 'Learn and Grow ',
            disc: 'Together!'
           
        },
        {  
            image:`${image2}`, 
            name: 'In your own ',
            disc: 'Space!'
            
            
        },
        { 
            image:`${image3}`, 
            name: 'At your own ',
            disc: 'Pace!'
           
            
        }

    ]

    return (
        <div>
        {/* <Card className="App-Card">
            <h3>Home</h3>
        </Card> */}
        <Carousel animation='slide' duration={500}>
            {
                items.map( (item,i)=> <Item key={i} item={item} /> ) 
                
                
                
            }
        </Carousel>

        </div>
    )
}

function Item(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <div className='slide'>
                    <div className='slider-image'>
                        <img src={props.item.image}
                            alt='carousel'/>
                    </div>
                    <div className='meta' >
                        <h2>{props.item.name}</h2>
                        <h1>{props.item.disc}</h1>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
export default Home;