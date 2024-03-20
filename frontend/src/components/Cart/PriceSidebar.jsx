import { Box, Card, Typography } from '@material-ui/core';

const PriceSidebar = ({ cartItems }) => {
    return (
        <Box display="flex" position="sticky" top={16} flexDirection="column" width={1/3} px={1}>

            {/* <!-- nav tiles --> */}
            <Card style={{ backgroundColor: 'white', borderRadius: '4px' }}>
                <Typography variant="h6" style={{ padding: '16px', borderBottom: '1px solid gray', fontWeight: '500', color: 'gray' }}>PRICE DETAILS</Typography>

                <Box display="flex" flexDirection="column" gap={2} p={4} pb={3}>
                    <Box display="flex" justifyContent="space-between" gap={1} p={1} pb={0}>
                        <Typography>Price ({cartItems.length} item)</Typography>
                        <Typography>${cartItems.reduce((sum, item) => sum + (item.cuttedPrice * item.quantity), 0).toLocaleString()}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" gap={1} p={1} pb={0}>
                        <Typography>Discount</Typography>
                        <Typography style={{ color: 'green' }}>- ${cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" gap={1} p={1} pb={1}>
                        <Typography>Delivery Charges</Typography>
                        <Typography style={{ color: 'green' }}>FREE</Typography>
                    </Box>

                    <Box borderColor="grey.500"></Box>
                    <Box borderTop={0.5} display="flex" justifyContent="space-between" gap={1} p={2} pb={0}>
                        <Typography variant="h6">Total Amount</Typography>
                        <Typography>${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</Typography>
                    </Box>
                    <Box  borderColor="grey.500"></Box>


                </Box>

            </Card>
            {/* <!-- nav tiles --> */}

        </Box>
    );
};

export default PriceSidebar;
