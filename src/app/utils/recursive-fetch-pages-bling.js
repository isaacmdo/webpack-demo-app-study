import fetchPages from "./fetch-products-bling";

export default async function recursiveSequentialFetch({ page, data, maxCalls }) {
  let json = await fetchPages({ page });

  data.push(json);

  //console.log("Sequential Fetch", page, data);

  if (page < maxCalls) {
    return recursiveSequentialFetch({ page: page + 1, data, maxCalls });
  } else {
    return { page, data, maxCalls };
  }
}