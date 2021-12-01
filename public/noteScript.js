let appdata;
const submitBtn = document.getElementById('submit');
const dataTable = document.getElementById('dataTable');
const noteName = document.getElementById('noteName');
const noteArea = document.getElementById('noteArea');
let inputSelect;
let modifyIndex = 0;

const createNode = function (elt) {
    return document.createElement(elt);
};
const makeTableHead = function () {
    let th1 = createNode('th');
    let th2 = createNode('th');
    let th3 = createNode('th');
    th1.innerHTML = 'Note';
    th2.innerHTML = 'Edit';
    th3.innerHTML = 'Delete';
    let tableRow = createNode('tr');
    tableRow.appendChild(th1);
    tableRow.appendChild(th2);
    tableRow.appendChild(th3);
    dataTable.appendChild(tableRow);
};
//Edit Function
const editPencil = function (pencil, row) {
    modifyIndex = pencil.id[6];
    console.log("Modify Index=" + modifyIndex);
    noteName.value = row.name;
    noteArea.value = row.note;
    submitBtn.innerHTML = "Update Note";
}
//Updates page.
const updatePage = function () {
    fetch('/updatePage', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        appdata = data;
        dataTable.innerHTML = "";
        makeTableHead();
        let rowNum = 1;
        appdata.map(function (row) {
            let tableRow = createNode('tr');
            let td1 = createNode('td');
            let td2 = createNode('td');
            let td3 = createNode('td');

            let pencil = createNode('i');
            pencil.id = `pencil${rowNum}`;
            pencil.innerHTML = "&#x270F";
            pencil.onclick = function (elt) {
                editPencil(pencil, row);
                elt.preventDefault();
                return false;
            };
            let cross = createNode('i');
            cross.id = `cross${rowNum}`;
            cross.innerHTML = "&#x274C";
            cross.onclick = function (elt) {
                let body = cross.id;
                fetch('/delete', {
                    method: 'POST',
                    body
                }).then(function (response) {
                    console.log("Delete post sent to server: " + response);
                    updatePage();
                });
                elt.preventDefault();
                return false;
            };

            td1.innerHTML = row.name;
            td2.appendChild(pencil);
            td3.appendChild(cross);

            tableRow.appendChild(td1);
            tableRow.appendChild(td2);
            tableRow.appendChild(td3);
            dataTable.appendChild(tableRow);
            tableRow.className = rowNum;
            rowNum++;
        });
    });
    fetch('/updatePage', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        appdata = data;
        console.log("APPDATA ON UPDATE = " + appdata.length);
        console.log("APPDATA VALUE\n" + JSON.stringify(appdata));
    });
};
updatePage();

//Makes page body.
const makePageBody = function () {
    const json = {
        name: noteName.value,
        note: noteArea.value,
        modifyIndex
    };
    return JSON.stringify(json);
};

//Makes post and sends to server.
const makePost = function () {
    let body = makePageBody();
    fetch(`/${inputSelect}`, {
        method: 'POST',
        body
    }).then(function (response) {
        console.log("Post from makePost sent to server: " + response);
        updatePage();
        noteName.value = "";
        noteArea.value = "";
    });
};
//Handles input once button is pressed.
const handleInput = function (elt) {
    if (submitBtn.innerHTML === "Save Note") {
        inputSelect = 'add';
        makePost();
    } else {
        inputSelect = 'modify';
        makePost();
        submitBtn.innerHTML = "Save Note";
        inputSelect='add'
        noteName.value = "";
        noteArea.value = "";
    }
    elt.preventDefault();
    return false;
};
submitBtn.onclick = handleInput;