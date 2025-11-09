import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";

function Items({ currentItems, viewMode }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className={`w-full ${viewMode === 'list' ? 'max-w-full' : ''}`}>
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
              category={item.category}
              brand={item.brand}
              viewMode={viewMode}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, products, viewMode = "grid" }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  // Determine grid classes based on view mode
  const getGridClasses = () => {
    if (viewMode === "list") {
      return "grid grid-cols-1 gap-6";
    } else {
      return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10";
    }
  };

  return (
    <div>
      <div className={getGridClasses()}>
        <Items currentItems={currentItems} viewMode={viewMode} />
      </div>
      
      {products.length > 0 ? (
        <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center mt-8">
          <ReactPaginate
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel=""
            pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
            pageClassName="mr-6"
            containerClassName="flex text-base font-semibold font-titleFont py-10"
            activeClassName="bg-black text-white"
          />

          <p className="text-base font-normal text-lightText">
            Products from {itemStart} to {Math.min(endOffset, products.length)} of{" "}
            {products.length}
          </p>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No products found matching your filters.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filters to see more products.</p>
        </div>
      )}
    </div>
  );
};

export default Pagination;