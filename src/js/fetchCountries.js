import '../js/references';
import countryCardTpl from '../temaplates/county-card.hbs';
import countriesCardsTpl from '../temaplates/countries.hbs';
import { error } from '@pnotify/core';
import debounce from 'lodash.debounce';
import API from './fetchApi';

const refs = {
  cardContainer: document.querySelector('.countries'),
  input: document.querySelector('.textbox'),
};

refs.input.addEventListener(
  'input',
  debounce(e => onSearch(e.target.value), 500),
);

function onSearch(name) {
  API.fetchCountries(name)
    .then(renderCountry)
    .catch(() =>
      error({
        title: 'Uh Oh!',
        delay: 2000,
        text: '* 404* nothing was found for your search',
      }),
    );
}

function renderCountry(data) {
  refs.cardContainer.innerHTML = '';

  if (data.length === 1) {
    const markupCountry = countryCardTpl(data);
    refs.cardContainer.innerHTML = markupCountry;
  }
  if (data.length > 1 && data.length <= 10) {
    const markupCountriesList = countriesCardsTpl(data);
    refs.cardContainer.innerHTML = markupCountriesList;
  }
  if (data.length > 10) {
    error({
      title: 'Uh Oh!',
      delay: 2000,
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}
