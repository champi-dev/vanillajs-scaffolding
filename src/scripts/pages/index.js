import mockData from '../../mock_data.json'

let artistsContainerNode
export default () => {
  mockData.forEach(({ name, description, link, image_url, downvotes, upvotes }, index) => {
    if (index === 0) {
      setHeaderArtist({ name, description, link, image_url })
      return
    }

    console.log(downvotes, upvotes)

    const upper = upvotes / (downvotes + upvotes)
    const downper = downvotes / (downvotes + upvotes)
    setSingleArtist({
      name,
      description,
      link,
      image_url,
      downper: !isNaN(downper) ? downper * 100 : 0,
      upper: !isNaN(upper) ? upper * 100 : 0,
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

function setSingleArtist({ name, description, link, image_url, downper, upper }, index) {
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
    element.querySelector('.vote_card_complex').style.backgroundImage = `url(${image_url})`
    element.querySelector('.vote_card_complex__content__title h3').textContent = name
    element.querySelector('.vote_card_complex__content__description p').textContent = trimText(description, 12)
    element.querySelector('.vote_card_complex__content__description__bottom a').href = link
    element.querySelector('.vote_card_complex__result__left').style.width = `${upper}%`
    element.querySelector('.vote_card_complex__result__left span').textContent = `${Math.round(upper)}%`
    element.querySelector('.vote_card_complex__result__right').style.width = `${downper}%`
    element.querySelector('.vote_card_complex__result__right span').textContent = `${Math.round(downper)}%`
    element.querySelector('.vote_card_complex__content__title__like').classList.add(upper >= downper ? 'default' : 'alt')
    console.log(upper >= downper, upper, downper)
  }
}

function trimText(str, max) {
  const strArr = str.split(' ')
  const filtered = strArr.map((s, i) => i < max ? s : '')
  return filtered.join(' ') + '...'
}