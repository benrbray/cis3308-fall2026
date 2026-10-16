import './style.css'

const formElement =
  document.querySelector<HTMLFormElement>(
    "#search-form"
  )!;

const searchResultsElement =
  document.querySelector<HTMLDivElement>(
    ".search-results"
  )!;

formElement.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  // convert form data into JSON
  const formData = new FormData(formElement);
  const formObject = Object.fromEntries(formData.entries());

  console.log("form submitted!");
  console.log(formObject);

  performSearch(formObject.query.toString());
}

interface SearchResult {
  title: string,
  url: string,
}

const performSearch = (query: string) => {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}`;
  const result: Promise<Response> = fetch(url);

  // define what action to take when the promise resolves
  result.then(response => {
    response.json().then(data => {
      let searchResults: SearchResult[] = [];
      // console.log(data);
      
      for(let artwork of data["data"]) {
        searchResults.push({
          title: artwork["title"],
          url: artwork["api_link"]
        })
      }

      console.log(searchResults);
      displaySearchResults(searchResults);
    })
  });

}

const displaySearchResults = (searchResults: SearchResult[]) => {
  for(let artwork of searchResults) {
    let artElement = document.createElement("div");
    artElement.className = "search-result";
    artElement.textContent = artwork.title;

    searchResultsElement.appendChild(artElement);
  }
}