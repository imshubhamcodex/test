import Home from './Home'
import LoginPage from './Components/LoginPage'
import SignupPage from './Components/SignupPage'
import MyAccount from './Components/Account/MyAccount';
import CategoryPage from './Components/Category/CategoryPage';
import AddCategory from './Components/Category/AddCategory';
import TestForm from './Components/TestForm';
import Quiz from './Components/Quiz';
import QuizList from './Components/QuizList';
import ModifyMetaData from './Components/Modify';
import QuizDescription from './Components/Quiz/quizDescription';
import requireAuth from './utlis/requireAuth';
import requireAnonymous from './utlis/requireAnonymous';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/Signup',
    exact: true,
    component: requireAnonymous(SignupPage, false),
  },
  {
    path: '/Login',
    exact: true,
    component: requireAnonymous(LoginPage, false),
  },
  {
    path: '/categories',
    exact: true,
    component: CategoryPage,
  },
  {
    path: '/category_details/:categoryDetails',
    exact:true,
    component: QuizList, 
  },
  {
    path: '/add-category',
    exact: true,
    component: requireAuth(AddCategory, 'admin'),
  },
  {
    path: '/admin/add-quiz',
    exact: true,
    component: requireAuth(TestForm,'admin'),
  },
  // {
  //   path: '/quiz_details/:quizId',
  //   exact: true,
  //   component : QuizDescription
  // },
  {
    path: '/admin/metadata',
    exact: true,
    component: requireAuth(ModifyMetaData,'admin'),
  },
  {
    path: '/quiz',
    component: Quiz,
  },
  {
    path: '/myaccount',
    exact: true,
    component: requireAuth(MyAccount, false),
  },
]

export default routes