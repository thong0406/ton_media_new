import React from 'react';
import Home from './pages/home/Home';
import LayoutHome from './layout/home/Layout';
import './App.css';
import './index.css';
import {
	Route,
	Routes,
	BrowserRouter,
} from "react-router-dom";
import Login from './pages/home/Login';
import Dashboard from './pages/admin/Dashboard';
import ArticleDetails from './pages/home/ArticleDetails';
import CreatePost from './pages/admin/CreatePost';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LayoutHome />}>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/home" element={<Home />} />
				</Route>
				<Route path='/posts' element={<LayoutHome />}>
					<Route path='/posts/:key' element={<ArticleDetails />} />
				</Route>
				<Route path="/admin" element={<LayoutHome />}>
					<Route path="/admin/posts/dashboard" element={<Dashboard />} />
					<Route path="/admin/posts/create" element={<CreatePost />} />
					<Route path="/admin/posts/edit/:key" element={<CreatePost />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
