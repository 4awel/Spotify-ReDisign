
exports.handler = async (event, context) => {
  const { path } = event;
  
  if (path.includes('/api/deezer')) {
    // Ваша Express логика здесь
    const response = await fetch('https://api.deezer.com/search?q=MAKE FAMILY NOT FRIENDS&limit=300')
    const data = await response.json()
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }
}