import Card from "./components/Card";
import { CardContext } from "./context/cardContext";
import data from "./data.json";
import { useJobFilter } from "./hooks/useJobFilter";

export const App = () => {
  const {
    filters,
    filteredData,
    addFilter,
    removeFilter,
    clearFilters
  } = useJobFilter(data);

  return (
    <section className="bg-[#5da4a4]">
      <div className="bg-[url('./images/bg-header-mobile.svg')] md:bg-[url('./images/bg-header-desktop.svg')] h-38"></div>
      <div className="bg-[#f0fafb] min-h-[calc(100vh-9.5rem)] flex flex-col items-center gap-6 p-4 md:p-10 w-full">
        <section
          className={`flex p-4 items-center bg-white shadow-xl rounded-md w-full lg:w-4xl ${
            filters.length > 0 ? "flex" : "hidden"
          }`}
        >
          <div className="flex w-full flex-wrap md:flex-row items-center gap-2 gap-y-0">
            {filters &&
              filters.map((item, index) => (
                <div
                  key={index}
                  className="flex min-w-max items-center gap-2 p-2"
                >
                  <div className="bgPrimaryLight flex items-center flex-wrap">
                    <span className="h-7 font-semibold items-center flex px-2 textPrimary rounded-bl-sm rounded-tl-sm">
                      {item}
                    </span>
                    <div
                      className="h-7 w-7 bg-[#5ba4a4] flex items-center justify-center cursor-pointer rounded-br-sm rounded-tr-sm hover:bg-[#2c3a3a]"
                      onClick={() =>
                        removeFilter(item)
                      }
                    >
                      <img
                        src="./images/close-bold.svg"
                        className="h-5 w-5"
                        alt="closeIcon"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <span
            className="textPrimary font-bold cursor-pointer hover:underline"
            onClick={clearFilters}
          >
            Clear
          </span>
        </section>
        <CardContext.Provider value={{ filters, addFilter }}>
          {filteredData
            ? filteredData.map((item:any) => (
                <Card
                  key={item.id}
                  company={item.company}
                  logo={item.logo}
                  contract={item.contract}
                  postedAt={item.postedAt}
                  new={item.new}
                  featured={item.featured}
                  location={item.location}
                  languages={item.languages}
                  level={item.level}
                  position={item.position}
                  role={item.role}
                  tools={item.tools}
                />
              ))
            : null}
        </CardContext.Provider>
      </div>
    </section>
  );
};
