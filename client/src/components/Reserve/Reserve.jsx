import React, { useState } from 'react'
import "./reserve.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'

const Reserve = ({ setOpen, hotelId }) => {
    const [selectRooms, setselectRooms] = useState([])
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setselectRooms(checked ? [...selectRooms, value] : selectRooms.filter((item) => item !== value))
    }

    const handleClick = () =>{
        
    }

    console.log(selectRooms)
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                    className='rClose'
                    onClick={() => setOpen(false)} />

                <span>Select Your rooms:</span>
                {data.map((item) => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max People:
                                <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        {item.roomNumber.map((RoomNumber) => (
                            <div className="room">
                                <label>{RoomNumber.number}</label>
                                <input type='checkbox' value={RoomNumber._id} onChange={handleSelect} />
                            </div>

                        ))}


                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now</button>
            </div>
        </div>

    )
}

export default Reserve
