import { useState } from 'react'
import Table from './Table';
import Form from './Form';

const LinkContainer = (props) => {
  const [links, putLinks] = useState([])

  const handleRemove = (index) => {
    /* Create logic for setting the state 
    to filter array and remove favLink at index */
    let updatedLinks = [...links]
    updatedLinks.splice(index, 1)
    putLinks(updatedLinks)
  }

  const handleSubmit = (form) => {
    /* Create logic to set state and 
    add new favLink to favLinks array in state */
    putLinks((links) => [...links, form])
  }

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new url with a name and link to the table.</p>
      {/*Add Table Component */}
      <Table linkData={links} 
      removeLink={handleRemove} />


      <br />

      <h3>Add New</h3>
      {/*Add Form Component */}
      <Form handleSubmit={handleSubmit} />
    </div>
  )
}

export default LinkContainer
