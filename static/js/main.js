const input = document.querySelector('#text');
input.addEventListener('keyup', changed);

function changed(evt) {
    if(evt.keyCode !== 32) {
        const text = input.value.trim().replace(/\s/g,'');
        console.log(text);
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
                                <span class="name">${elem.name}</span>\
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