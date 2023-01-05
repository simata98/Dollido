import cookies from 'react-cookies';
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------
console.log(1)
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const token = cookies.load('access');
console.log(token)
let elements = [];
if (token) {
  elements = [
    {
      title: 'Home',
      path: '/dashboard/app',
      icon: icon('ic_home'),
    },
    {
      title: 'lost112',
      path: '/dashboard/lost112',
      icon: icon('ic_police'),
    },
    {
      title: 'Dollido',
      path: '/dashboard/dollido',
      icon: icon('ic_D'),
    },
    {
      title: 'about',
      path: '/about',
      icon: icon('ic_about'),
    },
  ];
} else {
  elements = [
    {
      title: 'Home',
      path: '/dashboard/app',
      icon: icon('ic_home'),
    },
    {
      title: 'login',
      path: '/login',
      icon: icon('ic_login'),
    },
    {
      title: 'about',
      path: '/about',
      icon: icon('ic_about'),
    },
  ];
}

const navConfig = elements
export default navConfig;
