const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
  artists: {
    "0": {
      "name": "Dimebag Darrel",
      "description": "Darrell Lance Abbott (August 20, 1966 – December 8, 2004), best known by his stage name Dimebag Darrell, was an American musician and songwriter.",
      "link": "https://en.wikipedia.org/wiki/Dimebag_Darrell",
      "image_url": "https://www.autopistarock.com/images/easyblog_articles/3882/DimebagDarrel-800x445.jpg",
      "downvotes": 3,
      "upvotes": 8
    },
    "1": {
      "name": "Zakk Wylde",
      "description": "Zachary Phillip Wylde (born Jeffrey Phillip Wielandt; January 14, 1967) is an American musician, singer, songwriter, and actor.",
      "link": "https://en.wikipedia.org/wiki/Zakk_Wylde",
      "image_url": "https://wallup.net/wp-content/uploads/2019/09/08/917773-zakk-wylde-black-label-society-zakk-wylde-ozzy-guitar-heavy-metal-748x421.jpg",
      "downvotes": 2,
      "upvotes": 9
    },
    "2": {
      "name": "Tony Iommi",
      "description": "Anthony Frank Iommi (/aɪˈoʊmi/; born 19 February 1948) is an English guitarist, songwriter and produce",
      "link": "https://en.wikipedia.org/wiki/Tony_Iommi",
      "image_url": "https://ichef.bbci.co.uk/news/976/cpsprodpb/4FE6/production/_93945402_gettyimages-610277918.jpg",
      "downvotes": 10,
      "upvotes": 1
    },
    "3": {
      "name": "Scott Ian",
      "description": "Scott Ian (born Scott Ian Rosenfeld;[1] December 31, 1963) is an American musician, author and spoken word storyteller best known as the rhythm guitarist",
      "link": "https://en.wikipedia.org/wiki/Scott_Ian",
      "image_url": "https://i.pinimg.com/originals/3b/21/72/3b2172138b5d6ede468d7edeb6ea6c1a.jpg",
      "downvotes": 1,
      "upvotes": 10
    },
    "4": {
      "name": "Jeff Hanneman",
      "description": "Jeffrey John Hanneman (January 31, 1964 – May 2, 2013) was an American musician, best known as a founding member and co-lead guitarist of the American thrash metal band Slayer.",
      "link": "https://en.wikipedia.org/wiki/Jeff_Hanneman",
      "image_url": "https://theworldwentaway.files.wordpress.com/2013/05/jeff_hanneman___slayer_by_tvrphotography.jpg",
      "downvotes": 10,
      "upvotes": 1
    }
  }
})
  .write()

module.exports = db