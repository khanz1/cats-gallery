import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [cats, setCats] = useState([]);

  const fetchData = async () => {
    const url = new URL("https://api.thecatapi.com");
    url.pathname = "/v1/images/search";
    url.searchParams.set("limit", "10");

    const response = await fetch(url.toString());
    const data = await response.json();

    setCats((prevCats) => {
      return prevCats.concat(data);
    });
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center container-xxl py-10">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold py-5">
        Welcome to the Cat Gallery
      </h1>
      <InfiniteScroll
        dataLength={cats.length}
        next={fetchData}
        hasMore={true}
        loader={
          <p className="text-center my-5">
            <b>Keep scrolling down to see more cats...</b>
          </p>
        }
        endMessage={
          <p className="text-center my-5">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-12 gap-3 w-3/4 m-auto">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="lg:col-span-4 sm:col-span-6 col-span-12 hover:cursor-pointer grayscale hover:filter-none"
            >
              <div
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ height: 200 }}
              >
                <img
                  src={cat.url}
                  alt="Cat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
}

export default App;
