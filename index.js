const fs = require('fs')

const outputFile = `./${process.argv[2] || 'data'}.csv`
let writeStream = fs.createWriteStream(outputFile)

const data = fs.readFileSync('./countries.txt', {encoding:'utf8', flag:'r'})

const dataSplit = data.split(/\r?\n/)
dataSplit.shift()

const countries = []
dataSplit.forEach(item => {
  const splits = item.split(' ')
  const numbersArray = splits.filter(e => e.match(/\d/g))
  const namesArray = splits.filter(e => !e.match(/\d/g))
  const name = namesArray.join(' ')
  
  if(numbersArray.length === 2){
    // const data = numbersArray.map(item=> Number(item.replaceAll(',','')))
    // population = data[0]
    // area = data[1]
  
   
    // numbersArray[1] = numbersArray[1] + '.' + numbersArray[2]
    // numbersArray.pop()
    // const [population, area] = numbersArray.map(item=> Number(item.replaceAll(',','')))

  
    // const [population, area] = numbersArray.map(item=> Number(item.replaceAll(',','')))
    // area !== undefined  ? density = population/area : density = 0
      
    const [population, area] = numbersArray.map(item => Number(item.replaceAll(',','')))
    const density = population/area
    countries.push({name, population, area, density})
  }
  
  
})


 countries.sort((a, b)=> b.density - a.density)


countries.forEach((country) => {     
    let newLine = []
    if(country.name && country.population && country.area && country.density){
      newLine.push(country.name)
      newLine.push(country.population)
      newLine.push(country.area)
      newLine.push(country.density)
      writeStream.write(newLine.join(',')+ '\n')
    }
   
})

writeStream.end()

writeStream.on('finish', () => {
  
    console.log(`Total:${dataSplit.length} entries,
${dataSplit.length - countries.length} skipped for incorrect format data,
${countries.length} densities calculated and added to csv.`)

}).on('error', (err) => {
    console.log(err)
})

console.log(`
`);