import React, { useState, useEffect, useMemo } from 'react';
import './App.scss';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import _ from 'lodash';
import datum from './csvjson.json';

const App = () => {
  const columns = [
    {
      id: 'Company',
      label: 'Company\u00a0Name',
      minWidth: 170,
    },
    { id: 'Position', label: 'Position', minWidth: 140 },

    { id: 'FirstName', label: 'First\u00a0Name', minWidth: 140 },
    {
      id: 'LastName',
      label: 'Last\u00a0Name',
      minWidth: 170,
    },
    { id: 'EmailA', label: 'Email\u00a0Address', minWidth: 170 },
    {
      id: 'PhoneNumber',
      label: 'Phone\u00a0#',
      minWidth: 170,
    },
  ];
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [filteredData, setFilteredData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function createData(
    Company,
    Position,
    FirstName,
    LastName,
    EmailA,
    PhoneNumber
  ) {
    return {
      Company,
      Position,
      FirstName,
      LastName,
      EmailA,
      PhoneNumber,
    };
  }
  /*   useEffect(() => {
    setTimeout(() => {
      const filter = datum.filter((d) => {
        return !d.position
          ? ''
          : d.position.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredData(filter);
    }, 250);
  }, [search]); */

  useEffect(() => {
    setTimeout(() => {
      const filter = _.filter(datum, (d) => {
        return d.Position.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredData(filter);
    }, 250);
  }, [search]);

  const rows = filteredData.map((each) =>
    createData(
      each.Company,
      each.Position,
      each.FirstName,
      each.LastName,
      each.EmailA,
      each.PhoneNumber
    )
  );

  const trail = useMemo(() => {
    const styles = [];
    [0, 0, 0].map((element, index) => {
      styles.push({
        animationDelay: `${index * 250}ms`,
      });
      return null;
    });
    return styles;
  }, []);

  console.log(rows);
  return (
    <React.Fragment>
      <div className="Search">
        <label className="fadeInUp" style={trail[0]}>
          {'Search by Position'}
        </label>
        <div className="line fadeInUp" style={trail[1]}></div>
        <div className="search-input-wrapper fadeInUp" style={trail[2]}>
          <input
            type="text"
            className="defaultTextBox advancedSearchTextbox"
            placeholder="Search by Position"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Paper className="fadeInUp" style={trail[0]}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="table-top">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[30, 50, 100, 250]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
};

export default App;
