import React, { useContext, useState } from 'react'
import "./reserve.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'

const Reserve = ({ setOpen, hotelId }) => {
    const [selectRooms, setselectRooms] = useState([])
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
    const {dates} = useContext(SearchContext)

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setselectRooms(checked ? [...selectRooms, value] : selectRooms.filter((item) => item !== value))
    }
    const getDatesRange = (startDate,endDate) =>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        let dates = []

        while(date <=end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }

        return dates
    }


    const handleClick = () =>{

    }

    console.log(getDatesRange(dates[0].startDate,dates[0].endDate))
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
