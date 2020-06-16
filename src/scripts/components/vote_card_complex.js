export default (element, { onVote }) => {
  element.querySelector('.vote_card_complex__vote__left')
    .addEventListener('click', () => vote('up'))
  element.querySelector('.vote_card_complex__vote__right')
    .addEventListener('click', () => vote('down'))

  element.querySelector('.result__repeat')
    .addEventListener('click', repeat)

  function vote (type) {
    element.querySelector('.vote_card_complex__vote').style.display = 'none'
    element.querySelector('.vote_card_complex__result').style.display = 'flex'

    const { upvotes, downvotes } = onVote(type)
    const upper = upvotes / (downvotes + upvotes) * 100
    const downper = downvotes / (downvotes + upvotes) * 100

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

  function repeat () {
    element.querySelector('.vote_card_complex__vote').style.display = 'flex'
    element.querySelector('.vote_card_complex__result').style.display = 'none'
  }
}