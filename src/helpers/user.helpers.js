




function setAge(year,month,date) {

	// current 
	const dateObj = new Date()
	const currentYear = +dateObj.getFullYear()
	const currentMonth = +dateObj.getMonth() + 1
	const currentDate = +dateObj.getDate() 
	

	// calculate age 
	let age = 0
  if(year) {
    if(+year < currentYear) {
      
      if(+month === currentMonth) {
        if(currentDate >= +date) age = currentYear - +year
        else if(currentDate < +date) age = currentYear - +year - 1
      }
      else if(currentMonth > +month) age = currentYear - +year
      else if(currentMonth < +month) age = currentYear -+ year -1
    }
    else if(+year >= currentYear) age = 0
  }


	return age
}


module.exports = {
	setAge	
}