import { useEffect, useState } from 'react'
import toast from "toasted-notes"
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Pop from '../../models/Pop'


const Index = ({ pops }) => {
  const router = useRouter()

  console.log('test', router.query.category)

  const { category } = router.query

  const [popsList, setPopsList] = useState(pops)
  const [isFilter, setIsFilter] = useState(false)

  useEffect(() => {
    setPopsList(pops)
    toast.notify("Irure est ea deserunt labore ullamco est nisi labore in.", { position: 'top-right' })
  }, [])

  const filterMissing = () => {
    const temp = popsList.filter(item => !item.possess)
    setPopsList(temp)
    setIsFilter(true)
  }

  const resetItems = () => {
    setIsFilter(false)
    setPopsList(pops)
  }



  return (
    <>
      <div className="flex flex-row">
        <h1 className="text-6xl ml-6 flex-grow">{category}</h1>
        <div className="mr-8 mt-8">
          {!isFilter && <button className="mr-4 border border-gray-800 p-3 rounded hover:bg-gray-800 hover:text-gray-200" type="button" onClick={() => filterMissing()}>Show Missing Pops</button>}
          {isFilter && <button className="mr-4 border border-gray-800 p-3 rounded hover:bg-gray-800 hover:text-gray-200" type="button" onClick={() => resetItems()}>Reset</button>}
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {/* Create a card for each pop */}
        {popsList.map((pop) => (
          <div key={pop._id}>
            <div className="card">
              <img className="w-full" src={pop.image_url} />
              <h5 className="pop-name">{pop.title}</h5>
              <div className="main-content">
                <p className="pet-name">{pop.title}</p>
                <p className="owner">Do I own: {pop.possess ? 'Yes' : 'No'}</p>

                <div className="btn-container">
                  <Link href="/[category]/[id]/edit" as={`/${pop._id}/edit`}>
                    <button className="btn edit">Edit</button>
                  </Link>
                  <Link href="/[category]/[id]" as={`/${pop._id}`}>
                    <button className="btn view">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* Retrieves pop(s) data from mongodb database */
export async function getServerSideProps({ params }) {
  await dbConnect()


  /* find all the data in our database */
  const result = await Pop.find().where({ category: params.category })
  const pops = result.map((doc) => {
    const pop = doc.toObject()
    pop._id = pop._id.toString()
    return pop
  })

  console.log('test2', params.category)
  console.log('test3', pops)


  return { props: { pops: pops } }
}

export default Index
