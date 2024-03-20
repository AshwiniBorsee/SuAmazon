import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { getAdminProducts } from '../../actions/productAction';
// import { getAllOrders } from '../../actions/orderAction';
import { fetchAllUsers } from '../../actions/userAction';
import MetaData from '../Layouts/MetaData';

const MainData = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  //const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAdminProducts());
    // dispatch(getAllOrders());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  //let totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0);

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <Typography variant="h4" className="text-gray-800 my-6 mx-4 sm:mx-6">
        Dashboard Overview
      </Typography>

      <TableContainer component={Paper} className="shadow-md sm:rounded-lg m-4 sm:m-4">
        <Table variant="outlined" className="text-sm" aria-label="dashboard overview table">
          <TableHead>
            <TableRow>
              <TableCell scope="col" className="py-3 px-6">
                Metric
              </TableCell>
              <TableCell scope="col" className="py-3 px-6">
                Total Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="bg-white border-b hover:bg-gray-50">
              <TableCell component="th" scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                Total Products
              </TableCell>
              <TableCell className="py-4 px-6">{products?.length}</TableCell>
            </TableRow>
            <TableRow className="bg-white hover:bg-gray-50">
              <TableCell component="th" scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                Total Users
              </TableCell>
              <TableCell className="py-4 px-6">{users?.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MainData;
