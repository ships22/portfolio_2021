// about section -

;(() => {
  const aboutSection = document.querySelector('.about-section'),
    tabsContainer = document.querySelector('.about-tabs')

  tabsContainer.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('tab-item') &&
      !event.target.classList.contains('active')
    ) {
      const target = event.target.getAttribute('data-target')
      tabsContainer
        .querySelector('.active')
        .classList.remove('outer-shadow', 'active')
      event.target.classList.add('active', 'outer-shadow')

      aboutSection
        .querySelector('.tab-content.active')
        .classList.remove('active')

      aboutSection.querySelector(target).classList.add('active')
    }
  })
})()

function bodyScrollingToggle() {
  document.body.classList.toggle('stop-scrolling')
}
// porfolio filter and popup -
;(() => {
  const filterContainer = document.querySelector('.portfolio-filter'),
    portfolioItemsContainer = document.querySelector('.portfolio-items'),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    popup = document.querySelector('.portfolio-popup'),
    prevBtn = popup.querySelector('.pp-prev'),
    nextBtn = popup.querySelector('.pp-next'),
    closeBtn = popup.querySelector('.pp-close'),
    projectDetailsContainer = popup.querySelector('.pp-details'),
    pojectDetailsBtn = popup.querySelector('.pp-project-details-btn')
  let itemsIndex, slideIndex, screenshots

  // filter portfolio items -
  filterContainer.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('filter-item') &&
      !event.target.classList.contains('active')
    ) {
      // deactivate existing active 'filter-items' -
      filterContainer
        .querySelector('.active')
        .classList.remove('outer-shadow', 'active')
      // activate new 'filter item' -
      event.target.classList.add('active', 'outer-shadow')
      const target = event.target.getAttribute('data-target')
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute('data-category') || target === 'all') {
          item.classList.remove('hide')
          item.classList.add('show')
        } else {
          item.classList.remove('show')
          item.classList.add('hide')
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio-item-inner')) {
      const portfolioItem = event.target.closest(
        '.portfolio-item-inner'
      ).parentElement
      //get the portfolioItem index -
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      )
      screenshots = portfolioItems[itemIndex]
        .querySelector('.portfolio-item-img img')
        .getAttribute('data-screenshots')
      //convert screenshots into array -
      screenshots = screenshots.split(',')
      if (screenshots.length === 1) {
        prevBtn.style.display = 'none'
        nextBtn.style.display = 'none'
      } else {
        prevBtn.style.display = 'block'
        nextBtn.style.display = 'block'
      }
      slideIndex = 0
      popupToggle()
      popupSlideShow()
    }
  })

  closeBtn.addEventListener('click', () => {
    popupToggle()
  })

  function popupToggle() {
    popup.classList.toggle('open')
    bodyScrollingToggle()
  }

  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex]
    const popupImg = popup.querySelector('.pp-img')
    // activate loader until the popupImage loaded -
    popup.querySelector('.pp-loader').classList.remove('active')
    popupImg.src = imgSrc
    popupImg.onload = () => {
      // deactivate loader after the popupImg loaded -
      popup.querySelector('.pp-loader').classList.remove('active')
    }
    popup.querySelector('.pp-counter').innerHTML =
      slideIndex + 1 + ' of ' + screenshots.length
  }
  //next -
  nextBtn.addEventListener('click', () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0
    } else {
      slideIndex++
    }
    popupSlideShow()
  })
  //prev -
  prevBtn.addEventListener('click', () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1
    } else {
      slideIndex--
    }
    popupSlideShow()
  })
})()
