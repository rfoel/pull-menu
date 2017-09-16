const menu = document.querySelector("#menu")
const items = menu.querySelectorAll("li")

items[0].classList.add("active")

items.forEach((item, index) => {
  item.setAttribute("data-index", index)
})
getItemX(2)
function getItemX(index) {
  let item = menu.querySelector(`[data-index='${index}']`)
  console.log(item)
  // var item_offset = $item.offset().left
  // var item_width = $item.outerWidth()
  // var menu_offset = $("#menu").offset().left
  // var screen_width = $("#screen").width()
  // return menu_offset - item_offset + (screen_width - item_width) / 2
}
