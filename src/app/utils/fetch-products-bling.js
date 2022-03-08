export default async function fetchPages({ page }) {
  let url = `https://mycorsproxy-zweeeeelll.herokuapp.com/https://bling.com.br/Api/v2/produtos/page=${page}/json/&apikey=b94a057d789b1fcfdf83ce7d2bc9214cb60f21c933dd49c04cd916204d76c18b7fb73b9e`;
      let req = await fetch(url, {
        mode: "cors"
      }).then(function (response) {
        return response.json();
      })

      return req;
}