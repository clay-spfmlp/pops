import dbConnect from '../../../utils/dbConnect'
import Pop from '../../../models/Pop'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const pop = await Pop.findById(id)
        if (!pop) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: pop })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        await console.log(id)
        // const pop = await Pop.findByIdAndUpdate(id, req.body, {
        //   new: true,
        //   runValidators: true,
        // })

        const pop = await Pop.findById(id)

        await pop.update(req.body)
        
        await console.log(pop)
        if (!pop) {   
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: pop })
      } catch (error) {
        console.log('pop')
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPop = await Pop.deleteOne({ _id: id })
        if (!deletedPop) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
