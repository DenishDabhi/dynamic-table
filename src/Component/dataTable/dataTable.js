// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SouthIcon from "@mui/icons-material/South";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HideImageIcon from '@mui/icons-material/HideImage';
import ImageIcon from '@mui/icons-material/Image';

const DataTable = ({ data, columns }) => {
  const defaultItemsPerPage = 5;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [filterData, setFilterData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

  const applyFilters = () => {
    let filteredData = data;
    Object.keys(filters).forEach((key) => {
      filteredData = filteredData.filter((item) =>
        String(item[key]).toLowerCase().includes(filters[key])
      );
    });
    setFilterData(filteredData);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedData = () => {
    if (!filterData || filterData.length === 0) {
      return [];
    }

    if (!sortConfig.key) {
      return filterData;
    }

    return [...filterData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData().slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData().length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearch = (e, columnName) => {
    const value = e.target.value.toLowerCase();
    setFilters({
      ...filters,
      [columnName]: value,
    });
  };

  const MyFiltter = () => {
    setShowFilter(!showFilter);
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

  return (
    <>
      <div className='forTable'>
        <div className='buttonDiv'>
        <button onClick={MyFiltter} className="filter_button">
          {showFilters ? (
            <span style={{ display: "flex", fontSize: "17px" }}>
              Hide Filters <HideImageIcon style={{ fontSize: "17px" }} />
            </span>
          ) : (
            <span style={{ display: "flex", fontSize: "17px" }}>
              Show Filters <ImageIcon style={{ fontSize: "17px" }} />
            </span>
          )}
        </button>
        </div>
        <div className='table-container'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, }} aria-label="simple table" >
            <TableHead sx={{backgroundColor:'#D4EAEC'}}>
              <TableRow>
                {columns?.map((item) => (
                  <TableCell sx={{ fontWeight: 'bold', }} >
                    <span style={{ display: 'flex', alignItems: 'center', width:'100px'}}>
                      <span style={{display: 'flex'}}>{item.Header}</span>
                      {item.disableSortBy === false && (
                        <>
                          <SouthIcon
                            sx={{
                              fontSize: "13px",
                              opacity: sortConfig.direction === 'asc' ? '0.4' : '1',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleSort(item.Accessor)}
                          />
                          <ArrowUpwardIcon
                            sx={{
                              fontSize: "13px",
                              opacity: sortConfig.direction === 'asc' ? '1' : '0.4',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleSort(item.Accessor)}
                          />
                        </>
                      )}
                    </span>
                    {item.filter === false && showFilter && (<TextField
                      variant='standard'
                      type="search"
                      className='search'
                      placeholder={`Search ${item.Header}`}
                      onChange={(e) => handleSearch(e, item.Accessor)}
                    />)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems?.map((row, index) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={index}
                >
                  {columns?.map((mydata) => (
                    <TableCell key={mydata.Accessor}>
                      {mydata.Cell ? (
                        mydata.Cell({ value: row[mydata.Accessor], row })
                      ) : (
                        row[mydata.Accessor]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        <div style={{ display: 'flex' }}>
          <div className='main_page'>
            <div style={{ display: 'flex', gap: '5px' }}>
              <label htmlFor="itemsPerPage">Items per page:</label>
              <select
                id="itemsPerPage"
                onChange={handleItemsPerPageChange}
                value={itemsPerPage}
                style={{ width: "61px", height: "27px", borderRadius: '10px' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className='next_previus_button'>
              <IconButton aria-label="delete" onClick={handlePrevPage} disabled={currentPage === 1} sx={{ background: 'var(--my-background)', color: 'white' }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleNextPage} disabled={currentPage === totalPages} sx={{ background: 'var(--my-background)', color: 'white' }}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DataTable
