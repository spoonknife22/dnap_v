import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "shards-react";
import JoinForm from '../forms/JoinForm.js';
import { DrizzleContext } from "@drizzle/react-plugin";
import {  Loader } from 'rimble-ui';

export default ({ onClose }) => {
   
return (   
  <div className="overlay">
    <div className="modal modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header" aria-label="Close">
          <h5 className="modal-title">Decentralized NFT Protocols</h5>
          <button onClick={onClose}  type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div>    
          <DrizzleContext.Consumer>
            {drizzleContext => {
              const {drizzle, drizzleState, initialized } = drizzleContext;
                if(!initialized) {
                  return <Loader size="30px" color="blue" />
                  }
                  return(   
                         <JoinForm onClose={onClose} drizzleState={drizzleState} drizzle={drizzle} />    
                    )
                }
            }  
          </DrizzleContext.Consumer>
        </div>
      </div>
    </div>

      <style jsx>{`
            .overlay {
              background-color: rgba(65,65,85,0.58);
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 110;
            }
            .modal {
              position: fixed;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
              width: 538px;
              border-radius: 3px;
              padding: 14px;
              z-index: 120;
            }
            .modal :global(h3) {
              text-align: center;
              margin: 10px 0;
            }
      `}</style>

  </div>
     

    );




  };

