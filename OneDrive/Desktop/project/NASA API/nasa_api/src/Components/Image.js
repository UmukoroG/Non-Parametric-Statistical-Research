import React from 'react'

export default function Image({image}){
    return(
        <div>
            {/* <img src={image['links'][0]['href']} /> */}
            <h1>Title:{image['data'][0]['title']}</h1>
            <h1>Media type:{image['data'][0]['media_type']}</h1>
            <h1>Date:{image['data'][0]['date_created']}</h1>
        </div>
    )
}

