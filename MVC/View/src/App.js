import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './SideBar';
import SignIn from './SignIn';
import AboutUs from './AboutUs';
import FirstPage from './FirstPage';
import ContactUs from './ContactUs';
import VirtualGallery from './VirtualGallery';
import Home from './Home';
import PrivacyPolicy from './PrivacyPolicy';  // ייבוא הקומפוננטה החדשה




function App() {

  return (

    <Router>


        <Routes>
        <Route element={<Sidebar />}>
          <Route path="/firstpage" element={<FirstPage />} />
          <Route path="/virtualGallery" element={<VirtualGallery />} />
       
        </Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/contactUs" element={<ContactUs/>}/>
          <Route path="" element={<Home/>}/>
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />



        </Routes>

    </Router>
  );
}

export default App;