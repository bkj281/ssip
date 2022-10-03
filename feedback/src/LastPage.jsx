import React from 'react';
import './LoginPage.css';

function LastPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>Citizen Service App</h2>
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <img src='https://play-lh.googleusercontent.com/fD2vLDP144BfKG9giVjrfm0znaCORkRm0BOy4kLTEMKIp5WprFBCKpvKqM3Z6wvxQVLw=w240-h480-rw' alt='logo of citizen service app' width='100rem' />
      </div>
      <div style={{ fontSize: '0.7rem' }}>
        <p>
          Home Department, Government of Gujarat has provided this Citizen First Android Application for the benefit of Citizens to avail online services.
          Citizen can do Application Registration, Senior Citizen Registration, Missing Person Registration, Stolen Property Registration, No Objection Certificate, Get FIR Copy, etc.
        </p>
        <p>
          All the applications submitted through this Citizen First Android application are received at respective Police Station through eGujCop Project. Respective Officer at Police Station will take necessary actions for the received application and related status is then available to Citizen through this mobile app.
        </p>
      </div>
      <div>Click to open <a href='https://play.google.com/store/apps/details?id=com.tcs.digigov.mobility.dhs.citizen.gj&hl=en_IN&gl=US'>Citizen Service</a> App</div>
      <div>
        <p>contact number of police control room</p>
      </div>
    </div>
  );
}

export default LastPage;
