import React, {useEffect, Fragment, useState} from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';


const Tracker = (props) => {
    
    const [centersList, setCentersList] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 

        today = dd+'-'+mm+'-'+yyyy;
        let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=294&date=${today}`);
        response = await response.json();
        response = response.centers;

        let centers = [];
        response.forEach(element => {
            let flag = false;
            element.sessions.forEach(item => {
                if(item.min_age_limit == 18){
                    flag = true;
                }
                
                
            })
            flag && centers.push(element);
        });
        setCentersList(centers);
        console.log(centers);
    };

    

    return (
    <Fragment>
      <Table striped bordered hover size="sm">
        <tbody>
        {centersList.map(item=>{
          return(
            <tr>
                <td>{item.name} <br/> {item.pincode}</td>
                {item.sessions.map(slot=> slot.min_age_limit === 18 && (<td >{slot.date} <br/> {slot.available_capacity}</td>))}
            </tr>
          )
        })}
         </tbody>
      </Table>
    </Fragment>)
     
}

export default Tracker;