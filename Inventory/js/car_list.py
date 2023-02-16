from bs4 import BeautifulSoup
import json

# with open("../index_copy.html") as index:
#     soup = BeautifulSoup(index, features="lxml")
#
# inventory = soup.find("div", id="inventory")
# cars = soup.find_all("div", id="box")
#
# extracted_data = []
# for car in cars:
#     # Name, Image, Cost, Monthly Payments, Miles, Years, Car Manufacturaer, Car Make
#     attributes = [
#                     car.find("h3").text,
#                     car.find("img")['src'],
#                     int(car.find("div", id="bottom").find("h1").text.replace(",", "")[1:]),
#                     car.find("div", id="bottom").find("p").text,
#                     int(car.find("div", id="info").find("p", id="mile").text.split(' ')[1].replace(",", "")),
#                     int(car.find("h3").text.split(" ")[0]),
#                     car.find("h3").text.split(" ")[1], car.find("div", id="info").find("p").text
#                   ]
#
#     extracted_data.append(attributes)

with open("car_list.json") as car_list:
    cars = json.load(car_list)

car_count = 0
years = set()
miles = [cars["cars"][0][4], cars["cars"][0][4]]
price_range = [cars["cars"][0][2], cars["cars"][0][2]]
manufacturers = set()
for car in cars["cars"]:
    car_count += 1

    years.add(car[5])

    if car[4] < miles[0]:
        miles[0] = car[4]
    if car[4] > miles[1]:
        miles[1] = car[4]

    if car[2] < price_range[0]:
        price_range[0] = car[2]
    if car[2] > price_range[1]:
        price_range[1] = car[2]

    manufacturers.add(car[6])

car_info = {"car_count": car_count, "years": sorted(list(years)), "miles": miles, "price": price_range,
            "manufacturers": list(manufacturers)}

with open("car_info.json", "w+") as car_info_file:
    json.dump(car_info, car_info_file, indent=4)

with open("../index.html") as index:
    soup = BeautifulSoup(index, features="lxml")

year_downs = soup.find("div", id="year-down").ul
for li in year_downs.find_all("li"):
    li.decompose()

make_downs = soup.find("div", id="manufacturer-down").ul
for li in make_downs.find_all("li"):
    li.decompose()

for year in sorted(list(years)):
    year_down = soup.new_tag("li")
    button = soup.new_tag("button", attrs={"onclick": f"filter_year({year})", "class": "dropdown-item"})
    button.string = str(year)
    year_down.append(button)
    year_downs.append(year_down)

for make in list(manufacturers):
    make_down = soup.new_tag("li")
    button = soup.new_tag("button", attrs={"onclick": f"filter_manufacturer('{make}')", "class": "dropdown-item"})
    button.string = make
    make_down.append(button)
    make_downs.append(make_down)

with open("../index.html", "w", encoding='utf-8') as index:
    index.write(soup.prettify())
