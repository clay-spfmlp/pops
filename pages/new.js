import Form from '../components/Form'

const NewPop = () => {
  const popForm = {
    name: '',
    owner_name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
  }

  return <Form formId="add-pop-form" popForm={popForm} />
}

export default NewPop
