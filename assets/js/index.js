let body = document.body

let formElement = document.getElementById('contactForm')
let mainSelect = document.getElementById('mainSelect')
let mainSelectList = document.getElementById('mainSelectList')
let subSelectWrapper = document.getElementById('subSelectWrapper')
let subSelect = document.getElementById('subSelect')
let subSelectList = document.getElementById('subSelectList')
let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let mobileInput = document.getElementById('mobile')
let submitButton = document.getElementById('submitButton')
let primaryForm = {}

let footerFormElement = document.getElementById('footerForm')
let footerEmail = document.getElementById('footerEmail')
let footerForm = {}
let toTop = document.getElementById('toTop')

let formHandler = document.getElementById('formHandler')
let closeForm = document.getElementById('closeForm')

let toggleNav = document.getElementById('toggleNav')

const primarySelectHandler = e => {
  let selectedValue = e.target.value
  if (e.target.id === 'mainSelect') {
    selectedValue !== '' ? subSelectWrapper.classList.add('active') : subSelectWrapper.classList.remove('active')
    let holder = `<option value="" disabled placeholder selected>${selectedValue !== "" ? selectedValue : ''}</option>`
    for (let i = 0; i < 8; i++) {
      holder += `<option value="${selectedValue}${i + 1}">${selectedValue} ${i + 1}</option>`
    }
    subSelect.innerHTML = holder
  }
  primaryForm = {
    ...primaryForm,
    [e.target.id]: e.target.value
  }
}

const primaryInputHandler = e => {
  primaryForm = {
    ...primaryForm,
    [e.target.id]: e.target.value
  }
}

const primarySelectToggle = e => {
  // document.querySelectorAll('.selectWrapper').forEach(element => {
  //   element.classList.remove('open')
  // })
  e.target.parentElement.classList.toggle('open')
}

const primarySelectListHandler = e => {
  let selectedVal = e.target.attributes.value.value
  mainSelectList.querySelectorAll('li').forEach(element => {
    element.classList.remove('checked')
  })
  e.target.classList.add('checked')
  let selectedLabel = e.target.innerText
  mainSelect.value = selectedLabel
  subSelect.setAttribute('placeholder', `Select ${selectedLabel} option`)
  subSelect.value = ''
  mainSelect.parentElement.classList.remove('open')
  primaryForm = {
    ...primaryForm,
    mainSelect: selectedVal
  }
  if (selectedVal !== '') {
    subSelectWrapper.classList.add('active')
  }

  let num = 8
  subSelectList.innerHTML = ''
  for (let i = 0; i < num; i++) {
    subSelectList.innerHTML += `<li value="${selectedVal}${i + 1}">${selectedLabel} ${i + 1}</li>`
  }
  for (let i = 0; i < num; i++) {
    subSelectList.children[i].addEventListener('click', primarySubSelectListHandler)
  }
}

const primarySubSelectListHandler = e => {
  let selectedVal = e.target.attributes.value.value
  subSelectList.querySelectorAll('li').forEach(element => {
    element.classList.remove('checked')
  })
  e.target.classList.add('checked')
  let selectedLabel = e.target.innerText
  subSelect.value = selectedLabel
  subSelect.parentElement.classList.remove('open')
  primaryForm = {
    ...primaryForm,
    subSelect: selectedVal
  }
}

const primarySubmitHandler = e => {
  e.preventDefault()
  console.log(primaryForm)
  formElement.reset()
  subSelectWrapper.classList.remove('active')
  primaryForm = {}
  closeFormFunc()
}

const footerInputHandler = e => {
  footerForm = {
    ...footerForm,
    [e.target.id]: e.target.value
  }
}


const footerSubmitHandler = e => {
  e.preventDefault()
  console.log(footerForm)
  footerForm = {}
  footerFormElement.reset()
}

const scrollHandler = () => {
  window.scrollY > 300 ? toTop.classList.add('active') : toTop.classList.remove('active')
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const showFormFunc = () => {
  scrollTop()
  formElement.classList.add('active')
  body.classList.add('noScroll')
}

const closeFormFunc = () => {
  formElement.classList.remove('active')
  body.classList.remove('noScroll')
}

const toggleNavFunc = () => {
  document.getElementById('headerInnerWrapper').classList.toggle('active')
}

window.addEventListener('scroll', scrollHandler)
toTop.addEventListener('click', scrollTop)

nameInput.addEventListener('change', primaryInputHandler)
emailInput.addEventListener('change', primaryInputHandler)
mobileInput.addEventListener('change', primaryInputHandler)
// mainSelect.addEventListener('change', primarySelectHandler)
mainSelect.addEventListener('click', primarySelectToggle)
for (let i = 0; i < mainSelectList.children.length; i++) {
  mainSelectList.children[i].addEventListener('click', primarySelectListHandler)
}
subSelect.addEventListener('click', primarySelectToggle)
// subSelect.addEventListener('change', primarySelectHandler)
formElement.addEventListener('submit', primarySubmitHandler)

footerEmail.addEventListener('change', footerInputHandler)
footerFormElement.addEventListener('submit', footerSubmitHandler)

formHandler.addEventListener('click', showFormFunc)
closeForm.addEventListener('click', closeFormFunc)

toggleNav.addEventListener('click', toggleNavFunc)
