import React, { useEffect, useState } from "react";
import './Home.css';
import first from '../../assets/first.jpg'
import second from '../../assets/second.jpg'
import thrid from '../../assets/thrid.jpg'
import four from '../../assets/four.jpg'
import five from '../../assets/5.jpg'
import six from '../../assets/6.jpg'
import seven from '../../assets/7.jpg'
import eight from '../../assets/8.jpg'
import nine from '../../assets/9.jpg'
import ten from '../../assets/10.jpg'
import eleven from '../../assets/11.jpg'


const arr = [first, second, thrid, four, five, six, seven, eight, nine, ten, eleven]
const Home = (props) => {
    const [crCls, setCrCls] = useState('')
    useEffect(() => {
        setCrCls({ filter: 'none', opacity: 1, top: 200, top1: 210 })
    }, [])


    // const data=useLoaderData();
    const handleCarouselBtn = (action, index = 0) => {
        setCrCls({ display: 'none' })
        const elements = document.getElementsByClassName('carousel_list')
        const containe_elem = document.getElementsByClassName('carousel_container')[0]
        if (action === 'left') {
            containe_elem.appendChild(elements[0])
        } else {
            containe_elem.prepend(elements[elements.length - 1])
        }
        setTimeout(() => {
            setCrCls({ display: 'block' })
        }, 1)
        setTimeout(() => {
            setCrCls({ filter: 'none', opacity: 1, top: 200, top1: 210 })
        }, 1000)
    }

    return (
        <main className="container">
            <section className="home_main_container">
                <div className="home_content" style={{ ...crCls }}>Singapore</div>
                <div className="home_content_content" style={{ ...crCls, top: crCls.top1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum unde velit aliquam facere, fuga doloribus saepe cum ipsum deserunt architecto, minima accusantium delectus quas eos assumenda aut totam incidunt praesentium.</div>
                <section className={`carousel_container`} >
                    {arr.map((val, index) => {
                        return (<div key={index+1} className={`carousel_list ${index}`} style={{ backgroundImage: `url(${val})` }} />)
                    })}
                </section>

            </section>
            <div className="carousel_button">
                <button onClick={() => handleCarouselBtn('left')}>Left</button>
                <button onClick={() => handleCarouselBtn('right')} >Right</button>
            </div>
        </main>
    )
}

export default Home;