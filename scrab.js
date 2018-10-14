const readline = require('readline')
const fs = require('fs')
// 1. handle user input, 2. read file
// 3. sort word value 4. find top 5 words
// 5. print the top 5 words
var letterValues = {
  'e': 1,
  'a': 1,
  'i': 1,
  'o': 1,
  'n': 1,
  'r': 1,
  't': 1,
  'l': 1,
  's': 1,
  'u': 1,
  'd': 2,
  'g': 2,
  'b': 3,
  'c': 3,
  'm': 3,
  'p': 3,
  'f': 4,
  'h': 4,
  'v': 4,
  'w': 4,
  'y': 4,
  'k': 5,
  'j': 8,
  'x': 8,
  'q': 10,
  'z': 10
}

const userPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

userPrompt.question('Enter Letters:', handleUserInput.bind(null, userPrompt, read))

function handleUserInput (userPrompt, callback, response) {
  console.log('The top scoring words are:\n')
  var charArr = []
  // fill with finding the top 5 scoring words
  for (let i = 0; i < response.length; i++) {
    charArr[i] = response.charAt(i)
  }
  callback(charArr, sortWordValue)
  return charArr
}

function read (charArr, callback) {
  fs.readFile('./data/enable1.txt', 'utf8', function (err, data) {
    var wordValue = [] // holds values of words
    var wordList = [] // holds list of words
    var wordIndex = 0 // word list index
    if (err) {
      console.log('error', err)
    } else {
      var arr = data.toString().split('\n')
      for (var i in arr) {
        if (arr[i].length <= charArr.length) {
          var count = 0
          for (let j = 0; j < arr[i].length; j++) {
            var tempLet = arr[i].charAt(j)
            if (charArr.includes(tempLet)) {
              count++
            }
            if (count === arr[i].length) {
              wordList[wordIndex] = arr[i]
              wordValue[arr[i]] = wordValueFind(arr[i])
              wordIndex++
            }
          }
        }
      }
    }
    callback(wordValue, top5Words)
    return wordValue
  })
}

function wordValueFind (word) {
  let value = 0
  for (let i = 0; i < word.length; i++) {
    let tempChar = word.charAt(i)
    value += letterValues[tempChar]
  }
  return value
}

function sortWordValue (wordValue, callback) {
  var sortArr = []
  for (let word in wordValue) {
    sortArr.push([word, wordValue[word]])
  }

  sortArr.sort(function (a, b) {
    return a[1] - b[1]
  })
  callback(sortArr)
  return sortArr
}

function top5Words (sortArr) {
  var finalArray = []
  let ind = 0
  for (let i = sortArr.length - 1; i > sortArr.length - 6; i--) {
    finalArray[ind] = sortArr[i]
    ind++
  }
  console.log(finalArray)
  return finalArray
}
