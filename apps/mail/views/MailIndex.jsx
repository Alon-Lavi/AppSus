import { MailList } from '../cmps/MailList.jsx'
import { MailBoxFilter } from '../cmps/MailBoxFilter.jsx'
import { MailSearchFilter } from '../cmps/MailSearchFilter.jsx'



export function MailIndex() {
    return <div>
    <MailSearchFilter />
    <MailBoxFilter />
    <MailList />
    </div>
}

