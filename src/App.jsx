
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import './App.css'

const NotFound = lazy(() => import('./components/not_found/NotFound'));

const Footer = lazy(() => import('./layout/footer/Footer'));
const Navbar = lazy(() => import('./layout/navbar/Navbar'));
const LogIn = lazy(() => import('./pages/auth/logIn/LogIn'));
const Register = lazy(() => import('./pages/auth/register/Register'));
const About = lazy(() => import('./components/about/About'));
const  ArticleDetails = lazy(() => import('./pages/cms/articledetails/ArticleDetails'));
const Home = lazy(() => import('./pages/home/home'));
const CreateArtical = lazy(() => import('./pages/cms/createArticle/CreateArticle'));
const ArticalList = lazy(() => import('./pages/cms/articleList/ArticleList'));
const Edit = lazy(() => import('./pages/cms/update/Edit'));
const Spinner = lazy(() => import('./components/spinner/Spinner'));

function PrivateRouter({children}){
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined ? (
    children
  ): (
    <>
    <Navigate to="/" />
        {alert("Please go for login either you can't access product list")}
    </>
  )
}


const publicRoutes = [
    {
   path: "/",
   element:<Home/>
  },
  
  {
   path: "*",
   element:<NotFound/>
  },

   
  {
   path: "/about",
   element:<About/>
  },

  {
   path: "/auth/login",
   element: <LogIn/>
  },
    {
   path: "/auth/register",
   element: <Register/>
  }
]


const privateRoutes = [
   {
   path: "/cms/articalList",
   element: <ArticalList/>
  },
    {
     path:"/cms/articalCreate",
     element: <CreateArtical/>
    },
   
     {
     path:"/cms/articalDetails/:id",
     element: <ArticleDetails/>
    },
    {
    path: "/cms/edit/:id",
    element: <Edit/>
  }
]

function App() {
  

  return (
   <>
 
  <Suspense fallback={<Spinner/>}>
  <Router>
<Navbar/>

        <Routes>
       
        {publicRoutes.map((publicRoute, index)=>(
     <Route key={index} path={publicRoute.path} element={publicRoute.element} />
       ))}

         {privateRoutes.map((privateRoute, index)=>(
     <Route key={index} path={privateRoute.path} element={<PrivateRouter>{ privateRoute.element}</PrivateRouter>} />
       ))} 

       </Routes>
    <Footer/>
     
   </Router>    
 
  </Suspense>
   </>
  )
}

export default App
