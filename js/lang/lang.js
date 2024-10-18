const languageToggle = document.querySelector('#language-toggle');

const saveLangFileinLS = () => {
    fetch('./js/lang/lang.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('langFile', JSON.stringify(data));
    });
}

const getLangFileFromLS = () => {
    return JSON.parse(localStorage.getItem('langFile'));
}

const saveSelectedLanginLS = (lang) => {
    localStorage.setItem('selectedLang', lang);
}

const getSelectedLangFromLS = () => {
    return localStorage.getItem('selectedLang');
}

window.addEventListener('DOMContentLoaded', () => {
    saveLangFileinLS();

    const selectedLang = getSelectedLangFromLS();
    setLang(
        selectedLang ? getLangFileFromLS()[selectedLang] : getLangFileFromLS().es
    );

    if (selectedLang === 'pt') {
        languageToggle.checked = true;
    }
});

const setLang = (lang) => {
    const textFields = document.querySelectorAll('[data-lang]');
    textFields.forEach((field) => {
        const key = field.getAttribute('data-lang');
        const value = key.split('.').reduce((acc, part) => acc[part], lang);
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
            field.placeholder = value;
        }
        else {
            field.innerHTML = value;
        }
    });
    saveSelectedLanginLS(languageToggle.checked ? 'pt' : 'es');
}


languageToggle.addEventListener('click', function() {
    setLang(languageToggle.checked ? getLangFileFromLS().pt : getLangFileFromLS().es);
});

export default {
    setLang
}