var events = [
    {'Date': new Date(2021, 11, 7), 'Title': 'Doctor appointment at 3:25pm.'},
    {'Date': new Date(2021, 11, 8), 'Title': 'Birthday', 'Link': 'https://garfield.com'},
    {'Date': new Date(2021, 11, 14), 'Title': 'Finals', 'Link': 'https://www.google.com'},
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
const submitBtn = document.getElementById('submitBtn');
const year = document.getElementById('year')
const month = document.getElementById('month')
const day = document.getElementById('day')
const title = document.getElementById('title')
const link = document.getElementById('link')
const handleInput = function (elt) {
    if (year.value === '' || month.value === '' || day.value === '' || title.value === '') {
        window.alert("All fields besides link must be filled in!")
    } else {
        const date = new Date(year.value, month.value - 1, day.value)
        let event = null
        if (link.value === '')
            event = {'Date': date, 'Title': title.value}
        else
            event = {'Date': date, 'Title': title.value, 'Link': link.value}
        events.push(event)
        year.value=''
        month.value=''
        day.value=''
        title.value=''
        link.value=''
    }
    element.innerHTML = null
    caleandar(element, events, settings);
    elt.preventDefault()
    return false
}
submitBtn.onclick = handleInput;
