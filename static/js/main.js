const input = document.querySelector('#text');
input.addEventListener('keyup', changed);

window.addEventListener('keyup', key);

function key(evt) {
    if(evt.keyCode == 27) {
        document.querySelector('#infoBox').style.visibility = 'hidden';
    }
}

function changed(evt) {
    if(evt.keyCode !== 32) {
        const text = input.value.trim().replace(/\s/g,'');
        xhr = new XMLHttpRequest();
        xhr.open("POST", '/search', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        const params = `text=${text}`;
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                const elements = JSON.parse(xhr.responseText);
                let blocksHTML = '';
                elements.forEach(elem => {
                    blocksHTML += `<div class="block">\
                                <span class="number">${elem.number}</span>\
                                <span class="abbr">${elem.symbol}</span>\
                                <span class="name" onclick="getInfo(${elem.number})">${elem.name}</span>\
                            </div>`;
                });
                document.querySelector('#elements').innerHTML = blocksHTML;
            }
        }
        xhr.send(params);
    }else{
        return;
    }
}

function getInfo(number) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", '/info', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const params = `number=${number}`;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            const info = JSON.parse(xhr.responseText);
            displayInfoCard(info);
        }
    }
    xhr.send(params);
}

function displayInfoCard(info) {
    let rows = '';
    for(let property in info) {
        if(info.hasOwnProperty(property)) {
            const value = URI.withinString(info[property], (url) => {
                return `<a href="${url}">${url}</a>`;
            });
            rows += `<tr>\
                        <td>${capitalize(property)}</td>\
                        <td>${value}</td>\
                    </tr>`;
        }
    }
    const card = `<table>${rows}</table>`;
    const infoBox = document.querySelector('#infoBox');
    infoBox.innerHTML = card;
    infoBox.style.visibility = 'visible';
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}