const screen = document.querySelector("#screen")
const nav = document.querySelector("nav")
const menu = document.querySelector("#menu")
const items = menu.querySelectorAll("li")
let isMouseDown
let mouseStartY
let maxPull = 56

items[0].classList.add("active")

items.forEach((item, index) => {
  item.setAttribute("data-index", index)
})

menu.style.setProperty("transform", `translate(${getItemX(0)}px, 0)`)

getItemX(0)

function getItemX(index) {
  let item = menu.querySelector(`[data-index='${index}']`)
  let screenWidth = document.querySelector("#screen").offsetWidth

  return (
    menu.offsetLeft - item.offsetLeft + (screenWidth - item.offsetWidth) / 2
  )
}

function pullRelease() {
  isMouseDown = false
  nav.style.height = "56px"
}

function pull(e) {
  e.preventDefault()
  console.log(e.offsetY, mouseStartY)
  if (isMouseDown) {
    let diff = Math.max(0, e.offsetY + mouseStartY)
    if (diff > maxPull) {
      nav.style.height = `${56 + (diff - maxPull) / (diff * 0.01)}px`
    }
  }
}

screen.addEventListener("mousedown", e => {
  isMouseDown = true
  mouseStartY = e.offsetY
})

screen.addEventListener("mouseup", pullRelease)
screen.addEventListener("mouseleave", pullRelease)
screen.addEventListener("mousemove", pull)
