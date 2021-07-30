import allContacts from '~/static/data/contacts.json';


export const state = () => ({
    contacts: allContacts
  })

export const mutations={
    save (state, contacts) {
        state.contacts = contacts
      },
      find (state, email){
        state.contacts.find(contact => contact.email === email)
      }
}