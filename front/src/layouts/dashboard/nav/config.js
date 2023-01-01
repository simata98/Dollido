<<<<<<< HEAD
import HomeIcon from '@mui/icons-material/Home';

=======
>>>>>>> lost/sbs_main_final
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
<<<<<<< HEAD
    title: 'Home',
    path: '/dashboard/app',
    icon: icon('ic_home'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_login'),
=======
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
>>>>>>> lost/sbs_main_final
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
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
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
