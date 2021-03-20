let api_base_url = ''

if (process.env.NODE_ENV === 'development') {
  api_base_url = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  api_base_url = 'http://music-api.awesomegaryp.com'
}

export default { api_base_url }
