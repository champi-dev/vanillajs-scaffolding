import axios from 'axios'
import voteCardComplex from '../components/vote_card_complex'
import stateCreator from '../../utils/stateCreator'
import trimText from '../../utils/trimText'


let artistsContainerNode
export default () => {
  axios.get('http://localhost:3000/artists').then(res => {
    render(res.data)
  }).catch(e => render())
}

function render(dbData) {
  const state = stateCreator()
  if (dbData) state.setData(dbData)

  Object.values(state.data()).forEach(({
    name, description, link, image_url, downvotes, upvotes
  }, index) => {
    if (index === 0) {
      setHeaderArtist({ name, description, link, image_url })
      return
    }

    const upper = upvotes / (downvotes + upvotes) * 100
    const downper = downvotes / (downvotes + upvotes) * 100

    setSingleArtist({
      state,
      name,
      description,
      link,
      image_url,
      downper,
      upper,
    }, index - 1)
  })
}

function setHeaderArtist({ name, description, link, image_url }) {
  const header = document.querySelector('#index__header')
  const headerArtist = document.querySelector('#index_header_vote')

  header.style.backgroundImage = `url(${image_url})`
  headerArtist.querySelector('#vote_card_simple__background').style.backgroundImage = `url(${image_url})`
  headerArtist.querySelector('#vote_card_simple__content__title').textContent = `${name}?`
  headerArtist.querySelector('#vote_card_simple__content__description').textContent = description
  headerArtist.querySelector('#vote_card_simple__content__link').href = link
}

function setSingleArtist({ state, name, description, link, image_url, downper, upper }, index) {
  if (index === 0) {
    artistsContainerNode = document.querySelector('#index__body__poll')
    setArtistValues(document.querySelectorAll('.index__body__poll__single')[0])
    return
  }

  const newEl = document.createElement('div')
  newEl.className = 'index__body__poll__single'
  newEl.innerHTML = document.querySelectorAll('.index__body__poll__single')[0].innerHTML
  artistsContainerNode.appendChild(newEl)
  setArtistValues(document.querySelectorAll('.index__body__poll__single')[index])

  function setArtistValues(element) {
    voteCardComplex(element, {
      onVote: (type) => {
        const current = state.data()

        if (type === 'up') {
          current[index + 1].upvotes += 1
        } else {
          current[index + 1].downvotes += 1
        }

        state.setData(current)
        axios.post('http://localhost:3000/update', current[index + 1])
        return current[index + 1]
      }
    })

    element.querySelector('.vote_card_complex').style.backgroundImage = `url(${image_url})`
    element.querySelector('.vote_card_complex__content__title h3').textContent = name
    element.querySelector('.vote_card_complex__content__description p').textContent = trimText(description, 12)
    element.querySelector('.vote_card_complex__content__description__bottom a').href = link
    element.querySelector('.vote_card_complex__result__left').style.width = `${upper}%`
    element.querySelector('.vote_card_complex__result__left span').textContent = `${Math.round(upper)}%`
    element.querySelector('.vote_card_complex__result__right').style.width = `${downper}%`
    element.querySelector('.vote_card_complex__result__right span').textContent = `${Math.round(downper)}%`

    if (upper >= downper) {
      element.querySelector('.vote_card_complex__content__title__like').classList.remove('alt')
      element.querySelector('.vote_card_complex__content__title__like').classList.add('default')
    } else {
      element.querySelector('.vote_card_complex__content__title__like').classList.remove('default')
      element.querySelector('.vote_card_complex__content__title__like').classList.add('alt')
    }
  }
}



