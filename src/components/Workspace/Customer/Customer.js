import React from "react";
import './Customer.css';

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

function Customer({ id, first, last, email, phone, status, log, saveEdit, removeCustomer, currentCustomer}) {

    return (
      <div id="Customer__container">
        <Information id={ id } first={ first } last={ last } email={ email } phone={ phone } currentCustomer={currentCustomer} saveEdit={saveEdit}/>
        <Status id={ id } status={ status } currentCustomer={currentCustomer} saveEdit={saveEdit}/>
        <RepairLog id={ id } log={ log } currentCustomer={currentCustomer} saveEdit={saveEdit}/>
        <RemoveCustomer id={ id } removeCustomer={removeCustomer}/>
      </div>
    )
}

export default Customer;
