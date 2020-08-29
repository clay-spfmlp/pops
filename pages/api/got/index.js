import dbConnect from '../../../utils/dbConnect'
import Pop from '../../../models/Pop'
import axios from 'axios'
import cheerio from 'cheerio'


export default async function handler(req, res) {
  const { method } = req

  await dbConnect()


  //   await dbConnect()

  switch (method) {
    case 'GET':
      const url = 'http://popvinyls.com/funko-pop-vinyls-series/game-thrones-series/'
      // const url = 'http://popvinyls.com/funko-pop-vinyls-series/funko-pop-heroes-series/funko-pop-heroes-series-page-1/'

      axios.get(url)
        .then(response => {
          const data = []
          const $ = cheerio.load(response.data)
          $('div#gallery-1 .gallery-item').each((i, item) => {
            data.push({
              title: $(item).find('.gallery-caption').text().trim(),
              image_url: $(item).find('.gallery-icon a img').attr('src'),
              possess: true,
              category: 'got',
            })
          })

          Pop.collection.insert(data, function (err, docs) {
            if (err) {
              return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
          })

          res.status(200).json({ success: true, data: data })

        })
        .catch(error => {
          res.status(201).json({ success: false, error })
        })

      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
