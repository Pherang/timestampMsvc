const http = require('http')
const PORT = process.env.PORT

// Simple service that returns an object that contains the unix timestamp
// and a natural language date. 
// Decided to code this using http only and not express
http.createServer( (req,res) => {

  const { headers, method, url } =  req

  req.on('error', (err) => {
   console.log(err)
  });

  res.on('error', (err) => {
    console.log(err)
  });

  if (req.method === 'GET' && req.url === '/favicon.ico'){
    res.statusCode = 204
    res.end()
    console.log('Handled the get favicon request')
    return true
  }

  if (req.method === 'GET' && req.url === '/') {
    
    let instructions = 'Enter a date in natural language or milliseconds in the url'
    instructions += ' \nE.g. http://hostname/January 1, 2000'
    instructions += ' \nE.g. http://hostname/12378321678321'


    res.end(instructions)
    console.log('No date specfied in URL')
  }
  if (req.method === 'GET' && req.url.length >= 2) {
    
    // Index 0 is a / character of the url which we don't need
    let timeInput = req.url.substring(1).replace(/%20/g, " ")
    let timeInteger = Number.parseInt(timeInput, 10)
    if (Number.isInteger(timeInteger)) {
      console.log('Is Integer!')
      timeInput = timeInteger
    }
    let timeObject = {} 
    let unixTime = new Date(timeInput)
    console.log(timeInput)
    console.log(unixTime)
    if (!(Number.isNaN(unixTime))) {
      timeObject.unix = unixTime.getTime()
      timeObject.natural = unixTime.toDateString()
      res.end(JSON.stringify(timeObject))
    } else {
      res.end('Date format invalid')
    }
  }

}).listen(PORT, () => console.log(`Server listening on ${ PORT }`))
