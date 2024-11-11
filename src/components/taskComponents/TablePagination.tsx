interface TablePaginationInterface {
  pageNumbers: number;
  currentPage: number;
  onPageSelect: (value: number) => void;
}

export default function TablePagination(props: TablePaginationInterface) {
  const { pageNumbers, currentPage, onPageSelect } = props;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(pageNumbers, currentPage + 2);

  if (endPage - startPage < 4) {
    if (currentPage < 3) {
      endPage = Math.min(5, pageNumbers);
    } else if (currentPage > pageNumbers - 2) {
      startPage = Math.max(pageNumbers - 4, 1);
    }
  }

  const pagesToDisplay = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav className="pt-2">
      <ul className="inline-flex items-center gap-2 text-base h-10">
        <li
          onClick={() => onPageSelect(currentPage - 1)}
          className={`flex items-center justify-center px-4 h-10 leading-tight 
              ${
                currentPage === 1 || pageNumbers === 0
                  ? "text-gray-300 pointer-events-none opacity-30"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg cursor-pointer"
              }`}
        >
          Previous
        </li>

        {startPage > 1 && (
          <li
            onClick={() => onPageSelect(1)}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg cursor-pointer"
          >
            1
          </li>
        )}
        {startPage > 2 && <span className="px-1 text-white">...</span>}

        {pagesToDisplay.map((page) => (
          <li
            key={page}
            onClick={() => onPageSelect(page)}
            className={`flex items-center justify-center px-4 h-10 leading-tight 
                ${
                  page === currentPage
                    ? "text-blue-600 font-semibold bg-blue-100 dark:bg-gray-700 shadow-[0_0_0px_3px_rgba(30,64,175,1)]"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                cursor-pointer rounded-lg
              `}
          >
            {page}
          </li>
        ))}

        {endPage < pageNumbers - 1 && (
          <span className="px-1 text-white">...</span>
        )}
        {endPage < pageNumbers && (
          <li
            onClick={() => onPageSelect(pageNumbers)}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg cursor-pointer"
          >
            {pageNumbers}
          </li>
        )}

        <li
          onClick={() => onPageSelect(currentPage + 1)}
          className={`flex items-center justify-center px-4 h-10 leading-tight 
              ${
                currentPage === pageNumbers || pageNumbers === 0
                  ? "text-gray-300 pointer-events-none opacity-30"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg cursor-pointer"
              }
            `}
        >
          Next
        </li>
      </ul>
    </nav>
  );
}
