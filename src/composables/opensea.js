export function useOpenSea() {
  return fetch('https://api.opensea.io/api/v1/assets?order_by=sale_date&offset=0&limit=50', { method: 'GET' })
    .then(async (response) => {
      response = await response.json()
      return response.assets.filter(asset => asset.name && asset.image_preview_url)
    })
    .catch(err => console.error(err))
}