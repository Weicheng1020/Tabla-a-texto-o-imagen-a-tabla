// script.js

function showSection(section) {
    document.getElementById('ticket').classList.add('hidden');
    document.getElementById('text').classList.add('hidden');
    document.getElementById(section).classList.remove('hidden');
}

function processTicket() {
    const input = document.getElementById('ticketInput').files[0];
    const language = document.getElementById('ticketLanguageSelect').value;

    if (!input) {
        alert('Por favor, sube una imagen de un ticket.');
        return;
    }

    Tesseract.recognize(
        input,
        language,
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        const formattedText = formatToTable(text);
        document.getElementById('ticketResult').innerHTML = formattedText;
    }).catch(err => {
        console.error(err);
        alert('Hubo un error al procesar el ticket.');
    });
}

function processText() {
    const text = document.getElementById('textInput').value;
    const language = document.getElementById('textLanguageSelect').value;

    if (!text) {
        alert('Por favor, introduce un texto.');
        return;
    }

    const formattedText = formatToTable(text);
    document.getElementById('textResult').innerHTML = formattedText;
}

function formatToTable(text) {
    const lines = text.split('\n');
    let table = '<table border="1" cellspacing="0" cellpadding="5"><tr>';

    // Header (assuming the first line contains the headers)
    const headers = lines[0].split(/\s+/);
    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });
    table += '</tr>';

    // Rows
    for (let i = 1; i < lines.length; i++) {
        table += '<tr>';
        const columns = lines[i].split(/\s+/);
        columns.forEach(column => {
            table +=




