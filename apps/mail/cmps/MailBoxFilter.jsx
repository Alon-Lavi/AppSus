import { MailBoxModal } from "./MailBoxModal.jsx"
import { mailService } from '../services/mail.service.js';

const { useState, useEffect, useRef } = React;

export function MailBoxFilter ({ filterBy, onSetFilter }){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);


    
    return (
        <section>
          <button className="menu-button" onClick={() => setIsMenuOpen((prevState) => !prevState)}>
             <i className="fa-solid fa-bars"></i>
          </button>
            <div>
             <MailBoxModal setFilterByToEdit={setFilterByToEdit}   />
            </div>

        </section>
    )
}