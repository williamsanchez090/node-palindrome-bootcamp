const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
// const figlet = require('figlet')

const server = http.createServer(function (req, res) {
  // make page parser variable
  // make param parser variable
  const page = url.parse(req.url).pathname
  const params = querystring.parse(url.parse(req.url).query)
  console.log('this is page', page)
  // user requests to see the page, page should be '/' we want to respond with the index.html file. we only need to request index.html because style.css and main.js are linked to the html file
  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    })
    // add url to fetch in main.js
    // user requests pathway '/api' add coin specific if statements after
  } else if (page == '/api') {
    // use url we created to check if the query (property) is in the param object
    if ('checkedPalindrome' in params) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      const checker = {
        reg: /[\W_]/g,
        // The above function uses a regular expression. A regular expression is a sequence of characters that specify and certain search pattern.
        // the forward slash signifies the start of a regular expression
        // back slash capital W denotes non alpha numeric characters.
        // having the underscore removes underscores
        // g signifies global which tells to check the entire string
        string: params['checkedPalindrome'],
        result: '',
        stringChecker() {
          let lowerCase = this.string.toLowerCase().replace(this.reg, '')
          // this variable takes the value of string and removes all alpha numeric characters and underscores from the users input, a returns back the new string.
          let reversed = lowerCase.split('').reverse().join('')
          //this converts the string into an array of letters, reverses them, and then joins them back together as a reversed string. It also makes it all lowercase.
          if (this.string === '') {
            this.result = 'Please enter a word or sentence'
          } else if (reversed === lowerCase) {
            this.result = `${this.string} is a palindrome, W`
          } else {
            this.result = `${this.string} isn't a palindrome, L`
          }
        },
      }
      checker.stringChecker()
      res.end(JSON.stringify(checker))
    }
    // error response'
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data)
      res.end()
    })
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' })
      res.write(data)
      res.end()
    })
  } else {
    fs.readFile('error.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    })
  }
})
server.listen(9000)

// function palindrome(string){
//     let reg = /[\W_]/g

// }
// // Test cases
// palindrome("leon Noel")
// palindrome("booty")
// //create an object
// //is going to take in the query from the main js
// //the input from the main.js is going to be a string
// //take that string, flip it and see if it is the same
