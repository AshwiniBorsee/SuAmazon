import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userAction';

const Sidebar = ({ activeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar('Logout Successfully', { variant: 'success' });
    navigate('/login');
  };

  return (
    <List component="nav" className="hidden sm:flex flex-col gap-4 w-1/4">
      <ListItem>
        <div className="flex  px-12 py-4 bg-white rounded-sm shadow">
          <div className="flex flex-col ">
            <Typography variant="body3">Hello,</Typography>
            <Typography variant="h7" className="font-medium">
              {user.name}
            </Typography>
          </div>
        </div>
      </ListItem>

      <ListItem>
        <div className="flex flex-col bg-white rounded-sm shadow">
          <div className="flex items-center px-4 py-4 border-b">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Profile Details"
              component={RouterLink}
              to="/account"
              className="flex w-full justify-between font-medium text-gray-500 hover:text-grey"
            />
            <ChevronRightIcon />
          </div>

          <div className="flex items-center px-4 py-4 border-b">
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              className="flex w-full justify-between font-medium text-gray-500 hover:text-grey cursor-pointer"
              onClick={handleLogout}
            />
            <ChevronRightIcon />
          </div>
        </div>
      </ListItem>
    </List>
  );
};

export default Sidebar;
