const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

function uniq(array) {
  let unique = [];

  array.forEach(value => {
    if (!unique.includes(value)) {
      unique.push(value);
    }
  });

  return unique;
}

class CarFilter {
  static matchAny = 'Any';

  constructor() {
    this.cars = cars;
  }

  filter(make, model, year, price) {
    return this.cars.filter(car => {
      return this.matchesMake(make, car) && this.matchesModel(model, car) &&
      this.matchesYear(year, car) && this.matchesPrice(price, car);
    });
  }

  matchesMake(makeFilter, {make}) {
    if (makeFilter === CarFilter.matchAny) return true;
    return makeFilter === make;
  }

  matchesModel(modelFilter, {model}) {
    if (modelFilter === CarFilter.matchAny) return true;
    return modelFilter === model;
  }

  matchesYear(yearFilter, {year}) {
    if (yearFilter === CarFilter.matchAny) return true;
    return yearFilter === year;
  }

  matchesPrice(priceFilter, {price}) {
    if (priceFilter === CarFilter.matchAny) return true;
    return priceFilter === price;
  }

  uniqueMakes() {
    let makes = this.cars.map(car => car.make);
    return uniq(makes).toSorted((a, b) => a - b);
  }

  uniqueModels() {
    let models = this.cars.map(car => car.model);
    return uniq(models).toSorted((a, b) => a - b);
  }

  uniqueYears() {
    let years = this.cars.map(car => car.year);
    return uniq(years).toSorted((a, b) => a - b);
  }

  uniquePrices() {
    let prices = this.cars.map(car => car.price);
    return uniq(prices).toSorted((a, b) => a - b);
  }
}

class CarDOMInteractions {
  constructor() {
    this.filter = new CarFilter();
    this.cars = this.filter.cars;

    this.main = document.querySelector('main');

    this.renderCars();
  }

  renderCars() {
    this.cars.forEach(car => {
      let html = this.carTemplate(car);
      this.main.insertAdjacentHTML('beforeend', html);
    });
  }

  carTemplate(car) {
    return `<figure>
        <img src="${car.image}" alt="A picture of the ${car.make} ${car.model}">
        <ul> 
          <li>${car.make} ${car.model}</li>
          <li>Year: ${car.year}</li>
          <li>Price: $${car.price}</li>
        </ul>
      </figure>`
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded!');

  new CarDOMInteractions();
});