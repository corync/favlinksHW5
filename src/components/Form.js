import { useState } from 'react'

const Form = ({ handleSubmit }) => {
  const [form, updateForm] = useState({
    name: "",
    URL: ""
  })



  const handleChange = (event) => {
    /* Logic for changing state based on form changes */
    updateForm((form) => ({ ...form, [event.target.name]: event.target.value }))
  }

  const onFormSubmit = (event) => {
    // to prevent page reload on form submit
    event.preventDefault()

    /* Logic for calling props to 
    handle submission and setting state changes*/
    handleSubmit(form)
  }

  return (
    
    <form onSubmit={onFormSubmit}>
      {/*Logic for returning a form element 
      with labels and inputs for link name and URL */}
    <label>Name</label><br/>
    <input name='name' type='text' onChange={handleChange}></input>
    <br/>
    <label>URL</label><br/>
    <input name='URL' type='url'  onChange={handleChange}></input>
    <button type='submit'>Submit</button>
      
    </form>
  )
}

export default Form
