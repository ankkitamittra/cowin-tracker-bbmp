import React, {useEffect, Fragment, useState} from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';


const Tracker = (props) => {
    
    const [centersList, setCentersList] = useState([]);
    useEffect(() => {
       
        setInterval(()=>{
            getData();
           
        },3000);
    }, []);

    const getData = async () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 

        if(mm<10){
            mm='0'+mm;
        } 

        today = dd+'-'+mm+'-'+yyyy;
        let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=294&date=${today}`);
        response = await response.json();
        response = response.centers;

        let centers = [];
        response.forEach(element => {
            let flag = false;

            element.fee_type == "Paid" && element.sessions.forEach(item => {
                if(item.min_age_limit == 18){
                    flag = true;
                }
            })
            flag && centers.push(element);
        });
        setCentersList(centers);
    };

    const openAlert = (capacity, name) => {

        if(capacity > 0) {alert(`${name} - ${capacity}`)}
        
        return capacity;
    }

    return (
    <Fragment>
      <Table striped bordered hover size="sm">
        <tbody>
        {centersList.map(item=>{
          return(
            <tr key={item.name}>
                <td>{item.name} <br/> {item.pincode}</td>
                {item.sessions.map((slot,index)=> slot.min_age_limit === 18 && (<td key={index} >{slot.date} <br/> {openAlert(slot.available_capacity,item.name)}</td>))}
            </tr>
          )
        })}
        </tbody>
      </Table>
    </Fragment>)
     
}

export default Tracker;