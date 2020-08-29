import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPop = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: pop, error } = useSWR(id ? `/api/pops/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!pop) return <p>Loading...</p>

  const popForm = {
    title: pop.title,
    possess: pop.possess,
    image_url: pop.image_url,
  }

  return <Form formId="edit-pop-form" popForm={popForm} forNewPop={false} />
}

export default EditPop
