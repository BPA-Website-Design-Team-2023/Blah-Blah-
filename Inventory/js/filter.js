function revealDropDown(dropdown) {
  var dropdown_menus = document.getElementsByClassName(`dropdown-menu`);
  for (var i = 0; i < dropdown_menus.length; ++i) {
      var item = dropdown_menus[i];
      if (item.classList.contains("show") && item.id !== dropdown) {
        item.classList.toggle("show");
      }
  }

  document.getElementById(dropdown).classList.toggle("show");
}

window.onclick = function(event) {
  if (!(event.target.matches(`.list`) || event.target.parentElement.matches(`.list`) || event.target.matches(`.dropdown-item`))) {
      const dropdown_menus = document.getElementsByClassName(`dropdown-menu`);
      for (let i = 0; i < dropdown_menus.length; ++i) {
          const item = dropdown_menus[i];
          if (item.classList.contains("show")) {
              item.classList.toggle("show");
      }
    }
  }
}

async function get_cars() {
    const cars = await fetch(`./js/car_list.json`)
        .then((response) => response.json())
        .then((json) => {return json.cars});
    return cars
}

function set_car_divs(cars) {
    // remove original cars (reset boxes)
    let original_cars = document.getElementsByClassName(`box`);
    while(original_cars[0]) {
        original_cars[0].parentNode.removeChild(original_cars[0]);
    }

    let inventory = document.getElementById(`inventory`);
    for (let i = 0; i < cars.length; i++) {
        inventory.insertAdjacentHTML( `afterbegin`, `<div class="box"> ` +
            `<img src="${cars[i][1]}" alt=""> ` +
            `<h3>${cars[i][0]}</h3> <div id="info"> ` +
            `<p>${cars[i][7]}</p> <p style="font-size:20px; padding: 0 5px">&#x2022;</p> ` +
            `<p id="mile"> ${cars[i][4].toLocaleString("en-us")} miles</p> </div> <div id="bottom"> ` +
            `<h1 id="price">$${cars[i][2].toLocaleString("en-us")}</h1> ` +
            `<p id="payment">${cars[i][3]}</p> </div> </div>`);
    }
}

function get_cars_on_page(cars, page, cars_per_page) {
    return cars.slice(cars_per_page * (page - 1), cars_per_page * page);
}

function update_pages(cars, page, max_pages) {
    document.getElementById("page-count").innerText = `Page ${page} of ${max_pages === 0 ? 1 : max_pages}`;

    set_car_divs(get_cars_on_page(cars, page, cars_per_page))

    document.getElementById("left").getElementsByTagName("button")[0].disabled = page <= 1;
    document.getElementById("right").getElementsByTagName("button")[0].disabled = page >= max_pages;
}

function set_current_cars() {
    page = 1
    current_cars = [...cars]

    if (search !== null) {
        for (let i = current_cars.length - 1; i >= 0; i--) {
            let name = current_cars[i][0]
            if (!name.trim().toLowerCase().includes(search.trim().toLowerCase())) {
                current_cars.splice(i, 1)
            }
        }

        search = null
    }

    if (price !== null) {
        for (let i = current_cars.length - 1; i >= 0; i--) {
            let car_price = current_cars[i][2]
            if (car_price < price[0] || (price[1] !== -1 && car_price > price[1])) {
                current_cars.splice(i, 1)
            }
        }
    }

    if (miles !== null) {
        for (let i = current_cars.length - 1; i >= 0; i--) {
            let car_miles = current_cars[i][4]
            if (car_miles < miles[0] || (miles[1] !== -1 && car_miles > miles[1])) {
                current_cars.splice(i, 1)
            }
        }
    }

    if (year !== null) {
        for (let i = current_cars.length - 1; i >= 0; i--) {
            if (current_cars[i][5] !== year) {
                current_cars.splice(i, 1)
            }
        }
    }

    if (make !== null) {
        for (let i = current_cars.length - 1; i >= 0; i--) {
            if (current_cars[i][6] !== make) {
                current_cars.splice(i, 1)
            }
        }
    }

    max_pages = Math.ceil(current_cars.length / cars_per_page)
}

function forward() {
    if (page < max_pages) {
        page += 1
        update_pages(current_cars, page, max_pages)
    }
}

function backward() {
    if (page > 1) {
        page -= 1
        update_pages(current_cars, page, max_pages)
    }
}

function filter_price(start, end) {
    if (price !== null && price[0] === start && price[1] === end) {
        price = null
        document.getElementById("price-text").innerText = "Price"
    } else {
        price = [start, end]
        if (start === 0) {
            document.getElementById("price-text").innerText = `< $${end.toLocaleString("en-us")}`
        } else if (end === -1) {
            document.getElementById("price-text").innerText = `> $${start.toLocaleString("en-us")}`
        } else {
            document.getElementById("price-text").innerText = `$${start.toLocaleString("en-us")} - $${end.toLocaleString("en-us")}`
        }
    }

    set_current_cars()
    update_pages(current_cars, page, max_pages)
}

function filter_miles(start, end) {
    if (miles !== null && miles[0] === start && miles[1] === end) {
        miles = null
        document.getElementById("miles-text").innerText = "Miles"
    } else {
        miles = [start, end]
        if (start === 0) {
            document.getElementById("miles-text").innerText = `< ${end.toLocaleString("en-us")}`
        } else if (end === -1) {
            document.getElementById("miles-text").innerText = `> ${start.toLocaleString("en-us")}`
        } else {
            document.getElementById("miles-text").innerText = `${start.toLocaleString("en-us")} - ${end.toLocaleString("en-us")}`
        }
    }

    set_current_cars()
    update_pages(current_cars, page, max_pages)
}

function filter_year(car_year) {
    if (car_year === year) {
        year = null
        document.getElementById("year-text").innerText = "Year"
    } else {
        year = car_year
        document.getElementById("year-text").innerText = year
    }

    set_current_cars()
    update_pages(current_cars, page, max_pages)
}

function filter_manufacturer(car_make) {
    if (car_make === make) {
        make = null
        document.getElementById("manufacturer-text").innerText = "Manufacturer"
    } else {
        make = car_make
        document.getElementById("manufacturer-text").innerText = make
    }

    set_current_cars()
    update_pages(current_cars, page, max_pages)
}

function filter_search(car_search) {
    if (car_search !== '') {
        search = car_search

        set_current_cars()
        update_pages(current_cars, page, max_pages)
    }
}

let cars = []
let current_cars = []
let car_info = {}

let page = 1
let max_pages = null
let cars_per_page = 15

let price = null
let miles = null
let year = null
let make = null
let search = null

get_cars()
    .then((_cars) => {
        cars = _cars
        current_cars = cars
        max_pages = Math.ceil(cars.length / cars_per_page)

        update_pages(current_cars, page, max_pages)
    })
