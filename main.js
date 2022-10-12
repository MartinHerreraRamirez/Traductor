// DOM ELEMENTS METHOD GET
let translateFrom = document.querySelector('#translateFrom')
let translateTo = document.querySelector('#translateTo')

// DOM ELEMENTS METHOD POST
let translate = document.querySelector('#translate')
let inputTranslate = document.querySelector('#inputTranslate')
let outTranslate = document.querySelector('#outTranslate')

//METHOD GET
const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages'

const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd5a3154b54msh21d49fac056ac59p15b53ajsn622f2fc5191a',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

let translateFromCode
let translateToCode

fetch(GET_URL, OPTIONS)
.then(res => res.json())
.then(objeto => {
    let lenguages = objeto.data.languages
    
    lenguages.forEach(element => {
        translateFrom.innerHTML += `<option value=${element.code}>${element.name}</option>`
        translateTo.innerHTML += `<option value=${element.code}>${element.name}</option>`
    });

    translateFrom.addEventListener('click', () =>{        
        translateFromCode = translateFrom.value
    })

    translateTo.addEventListener('click', () =>{
        translateToCode = translateTo.value
    })


}).catch(err => console.log(err))

//METHOD POST
translate.addEventListener('click', () => {
    let inputTranslate = document.querySelector('#inputTranslate')
    let textToTranslate = inputTranslate.value

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", translateFromCode);
    encodedParams.append("target_language", translateToCode);
    encodedParams.append("text", textToTranslate);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'd5a3154b54msh21d49fac056ac59p15b53ajsn622f2fc5191a',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => outTranslate.value = response.data.translatedText)
        .catch(err => console.error(err));
})

