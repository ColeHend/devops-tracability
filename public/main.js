const inputField = document.getElementById('inputField');
const addDiv = document.getElementById('additionDiv');
const content = document.getElementById('content')

function addToDiv() {
    let newDiv = document.createElement('div')
    newDiv.classList.toggle('contentItemBox',true)
    let textWr = document.createElement('p')
    textWr.textContent = inputField.value
    newDiv.appendChild(textWr)
    content.appendChild(newDiv)
}

axios.post('/add',inputField.value)
.then(res =>{rollbar.log(res)})
.catch(err=>console.log(err.response.data))