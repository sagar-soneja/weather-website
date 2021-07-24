console.log("client side javascript file is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

//messageone.textContent = "from js"
weatherForm.addEventListener('submit' ,(e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageone.textContent = data.error
            messagetwo.textContent = ""
            console.log(data.error)
        } else {
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
    console.log('testing!')
})