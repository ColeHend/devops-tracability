const inputField = document.getElementById('inputField');
const addDiv = document.getElementById('additionDiv');
const content = document.getElementById('content')
const theForm = document.getElementById('theForm')
function addToDiv() {
    let newDiv = document.createElement('div')
    newDiv.classList.toggle('contentItemBox',true)
    let textWr = document.createElement('p')
    textWr.textContent = inputField.value
    newDiv.appendChild(textWr)
    content.appendChild(newDiv)
}

function handle(e) {
    e.preventDefault()
    axios.post('/add',{inputField: inputField.value})
    .then(res =>{
        if (res.data[0]===true) {
            addDiv()
        }
    })
    .catch(err=>console.log(err.response.data))
}
theForm.addEventListener('submit',handle)
