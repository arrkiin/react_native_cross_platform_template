import { DrawerNavigator } from 'react-navigation';
import Simple1 from './Simple1';
import Simple2 from './Simple2';

export default DrawerNavigator(
  {
    Simple1: {
      screen: Simple1,
    },
    Simple2: {
      screen: Simple2,
    },
  },
  {
    drawerPosition: 'right',
    drawerWidth: 200,
  }
);
