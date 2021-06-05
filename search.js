const categoryChange = (val, templates) => {
  console.log(val)

  let searchResult = []

  if (val === 'All') {
    searchResult.push(...templates)
    return
  } 
  else if (val === 'Health') {
    const result = templates.filter(item => item.category.find(cat => cat === 'health'))
    searchResult.push(result)
    // setTemplatesCount(health.length)
    return
  } 
  else if (val === 'E-commerce') {
    const result = templates.filter(item => item.category.find(cat => cat === "e-commerce"))
    searchResult.push(result)
    // setTemplatesCount(result.length)
    return
  } 
  else {
    const result = templates.filter(item => item.category.find(cat => cat === "education"))
    searchResult.push(result)
    // setTemplatesCount(education.length)
    return
  }
}

module.exports = categoryChange;