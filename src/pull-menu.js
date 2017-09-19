const screen = document.querySelector("#screen")
const nav = screen.querySelector("nav")
const pullIcon = nav.querySelector(".pull-icon")
const menu = nav.querySelector("#menu")
const items = menu.querySelectorAll("li")
const totalPull = 50
const release = 30
const pullRelease = totalPull + release
const navHeight = nav.offsetHeight
const itemsCount = items.length
const pullStep = pullRelease / (itemsCount - 1)
let isMouseDown
let mouseStartY
let index

items.forEach((item, index) => {
  item.setAttribute("data-index", index)
  if (item.classList.contains("active")) {
    menu.style.setProperty("transform", `translate(${getItemX(index)}px, 0)`)
  }
})

function pullStart(e) {
  isMouseDown = true
  mouseStartY = e.offsetY
}

function pullEnd() {
  isMouseDown = false
  nav.style.height = `${navHeight}px`
  pullIcon.classList.remove("hide")
  menu.classList.remove("active")
  menu.style.paddingTop = 0
}

function pulling(e) {
  e.preventDefault()
  if (isMouseDown) {
    let newHeight = Math.max(0, e.offsetY - mouseStartY)
    if (newHeight > pullRelease) {
      newHeight = pullRelease + (newHeight - pullRelease) / (newHeight * 0.01)
    }
    nav.style.height = `${navHeight + newHeight}px`

    index = Math.max(
      0,
      Math.min(itemsCount - 1, Math.floor((newHeight - release) / pullStep))
    )

    if (newHeight > pullRelease + pullStep * 1) index = itemsCount - 1

    if (newHeight > release) {
      menu.classList.add("active")
      pullIcon.classList.add("hide")
    } else {
      menu.classList.remove("active")
      pullIcon.classList.remove("hide")
    }
    menu.style.setProperty("transform", `translate(${getItemX(index)}px, 0)`)
    items.forEach(item => item.classList.remove("active"))
    let item = menu.querySelector(`[data-index="${index}"]`)
    item.classList.add("active")
  }
}

function getItemX(index) {
  let menuOffsetLeft = menu.offsetLeft ? menu.offsetLeft : 0
  let item = menu.querySelector(`[data-index="${index}"]`)
  let itemOffsetLeft = item.offsetLeft ? item.offsetLeft : 0
  let screenWidth = document.querySelector("#screen").offsetWidth
  return menuOffsetLeft - itemOffsetLeft + (screenWidth - item.offsetWidth) / 2
}

nav.addEventListener("mousedown", pullStart)
screen.addEventListener("mouseup", pullEnd)
screen.addEventListener("mouseleave", pullEnd)
screen.addEventListener("mousemove", pulling)
