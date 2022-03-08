import recursiveSequentialFetch from "./recursive-fetch-pages-bling";

  recursiveSequentialFetch({ page: 1, data: [], maxCalls: 3 })
    .then(data => {
      productsArray.push(data.data);
      console.log(productsArray[0]);
    })
    .catch(err => {
      console.log(err);
    });

  export const productsArray = [];
