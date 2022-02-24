const firstName = document.getElementById('inputField');
const lastName = document.getElementById('inputField2');
const text = document.getElementById('inputField3');

const addDiv = document.getElementById('additionDiv');
const content = document.getElementById('content')
const theForm = document.getElementById('theForm')

function addToDiv(person) {
    let newDiv = document.createElement('div')
    newDiv.classList.toggle('contentItemBox',true)
    let textWr = document.createElement('p')
    textWr.textContent = person.first+' '+person.last
    newDiv.appendChild(textWr)
    newDiv.style.backgroundColor = person.text
    content.appendChild(newDiv)
    console.log('ran');
}
function getAll() {
    // e.preventDefault()
    axios.get('/people')
    .then(res =>{
            console.log(res.data);
            res.data.forEach(element => {
                addToDiv(element)
            });
    })
    .catch(err=>console.log(err))
}getAll()
function handle(e) {
    e.preventDefault()
    let sendObj = {
        first: firstName.value,
        last: lastName.value,
        text: text.value,
    }
    axios.post('/add',sendObj)
    .then(res =>{
        console.log(res.data);
        if (typeof res.data==='object') {
            content.innerHTML='';
            res.data.forEach(element => {
                addToDiv(element)
            });
        }
    })
    .catch(err=>console.log(err))
}
theForm.addEventListener('submit',handle)

