const screen = document.querySelector("#screen")
const nav = screen.querySelector("nav")
const pullIcon = nav.querySelector(".pull-icon")
const menu = nav.querySelector("#menu")
const items = menu.querySelectorAll("li")
let mouseStartY
const navHeight = nav.offsetHeight
let isMouseDown
const maxPull = 80
let itemsCount
let pullStep
let index

items.forEach((item, index) => {
  item.setAttribute("data-index", index)
  if (item.classList.contains("active")) {
    menu.style.setProperty("transform", `translate(${getItemX(index)}px, 0)`)
  }
})

itemsCount = items.length
pullStep = maxPull / (itemsCount - 1)

function getItemX(index) {
  let item = menu.querySelector(`[data-index="${index}"]`)
  let screenWidth = document.querySelector("#screen").offsetWidth

  return (
    menu.offsetLeft - item.offsetLeft + (screenWidth - item.offsetWidth) / 2
  )
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
    if (newHeight > maxPull) {
      newHeight = maxPull + (newHeight - maxPull) / (newHeight * 0.01)
    }
    nav.style.height = `${navHeight + newHeight}px`

    if (newHeight > navHeight - maxPull) {
      menu.classList.add("active")
      pullIcon.classList.add("hide")
      menu.style.paddingTop = `${(newHeight - navHeight) / 2}px`

      index = Math.floor(newHeight / pullStep)
      if (index < itemsCount) {
        let item = menu.querySelector(`[data-index="${index}"]`)
        menu.style.setProperty(
          "transform",
          `translate(${getItemX(index)}px, 0)`
        )
        items.forEach(item => item.classList.remove("active"))
        item.classList.add("active")
      }
    } else {
      menu.classList.remove("active")
      pullIcon.classList.remove("hide")
    }
  }
}

function pullStart(e) {
  isMouseDown = true
  mouseStartY = e.offsetY
}

nav.addEventListener("mousedown", pullStart)
screen.addEventListener("mouseup", pullEnd)
screen.addEventListener("mouseleave", pullEnd)
screen.addEventListener("mousemove", pulling)
