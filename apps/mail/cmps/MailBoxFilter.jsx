import { MailBoxModal } from "./MailBoxModal.jsx"
import { mailService } from '../services/mail.service.js';

const { useState, useEffect, useRef } = React;

export function MailBoxFilter ({ filterBy, onSetFilter }){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [menuRef]);

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