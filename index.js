'use strict';

const quotesDiv = document.querySelector('.quotes');
const listOfQuotes = document.createElement('ul');
const input = document.getElementById('quoteFilter');

let quotesList = [];

async function fetchQuotes() {
    try {

        let response = await fetch('https://dummyjson.com/quotes');
        if(!response.ok) throw new Error(`Unknown secnario error! status: ${response.status}`);
        const data = await response.json();
        return data.quotes;

    } catch(error) {
        console.error("Error while fetching quotes: ", error);
        return [];
    }
};



async function insertQuotesToDiv() {
    quotesList = await fetchQuotes();
    showQuotes(quotesList);
};

const showQuotes = (quotes)  => {
    quotesDiv.innerHTML = '';
    for(let i = 0; i < quotes.length; i++){
        let li = document.createElement('li');
        li.textContent = quotes[i].quote;
        quotesDiv.appendChild(li);
    }
};

const filterQuotes = (filterText) => {
    const filteredQuotes = quotesList.filter(q => q.quote.toLowerCase().includes(filterText.toLowerCase()));
    showQuotes(filteredQuotes);
};

input.addEventListener('input', (e) => {
    filterQuotes(e.target.value);
});

insertQuotesToDiv();