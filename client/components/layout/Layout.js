import React from 'react';
import Navbar from './Navbar.js';
import HeadOne from './Head.js';
import Footer from './Footer.js'
import { Provider } from 'react-redux';
import { DrizzleContext } from "@drizzle/react-plugin"; 
import { ToastContainer } from 'react-toastify';   
import { Drizzle } from "@drizzle/store";
import drizzleOptions  from "../../EthComponents/drizzleOptions";
import store from '../../middleware'

const drizzle = new Drizzle(drizzleOptions, store);

export const Page = ({ children }) => (
  <div className="main-container">
    <DrizzleContext.Provider drizzle={drizzle} >
      <Provider store={store}>  
      <HeadOne />
      <Navbar />  
        <main>
          <ToastContainer />
          {children}
        </main>
      <Footer />
      </Provider>  
    </DrizzleContext.Provider>
  </div>
) 
 
export const Center = ({ children }) => (
    <div>
      {children}  
    </div>
  )

