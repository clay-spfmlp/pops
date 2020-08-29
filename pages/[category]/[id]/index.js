import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../utils/dbConnect'
import Pop from '../../../models/Pop'

/* Allows you to view pop card info and delete pop card*/
const PopPage = ({ pop }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const popID = router.query.id

    try {
      await fetch(`/api/pops/${popID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the pop.')
    }
  }

  const titleEncode = (title) => {
    return encodeURIComponent(title)
  }

  const titleSearchable = (title) => {
    return title.split(' ').join('+')
  }

  return (
    <div key={pop._id}>
      <div className="flex flex-row mt-4">
        <div className="card mr-4">
          <img src={pop.image_url} />
          <h5 className="pop-name">{pop.title}</h5>
          <div className="main-content">
            <p className="pop-name">{pop.title}</p>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${pop._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <button className="btn delete" onClick={handleDelete}>
                Delete
            </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <a target="_blank" rel="noopener" href={`https://www.google.com/search?q=${titleEncode(pop.title)}`}>Search Goole</a>
          <a target="_blank" href={`https://www.amazon.com/s?k=${titleEncode(pop.title)}`}>Search Amazon</a>
          <a target="_blank" href={`http://www.ebay.com/sch/?_nkw=${titleEncode(pop.title)}`}>Search Ebay</a>
        </div>

      </div>

      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const pop = await Pop.find({ _id: params.id, catgeroy: params.catgeroy }).lean()
  pop._id = pop._id.toString()

  return { props: { pop } }
}

export default PopPage
