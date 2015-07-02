var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Home = require('modules/client/home/index');

var App = require('app');
var Admin = require('modules/admin/admin');
var Admin_Registration = require('modules/admin/registration/template');
var Admin_Login = require('modules/admin/login/template');

var LoggedIn = require('modules/admin/loggedIn');
var Admin_Home = require('modules/admin/home/index');

var Admin_Author = require('modules/admin/authors/template');
var Admin_Author_List = require('modules/admin/authors/list');
var Admin_Author_Add = require('modules/admin/authors/add');

var Admin_Poem = require('modules/admin/poems/template');
var Admin_Poem_List = require('modules/admin/poems/list');
var Admin_Poem_Add = require('modules/admin/poems/add');
var Admin_Poem_Edit = require('modules/admin/poems/edit');

var Admin_Painting = require('modules/admin/painting/template');
var Admin_Painting_List = require('modules/admin/painting/list');
var Admin_Painting_Add = require('modules/admin/painting/add');

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute name="app-index" handler={Home}/>
		<Route name="home" path="home" handler={Home}/>
		<Route name="admin" handler={Admin}>
			<DefaultRoute name="admin-index" handler={Admin_Login}/>
			<Route name="admin_registration" handler={Admin_Registration}/>
			<Route name="admin_login" path="login" handler={Admin_Login}/>
			<Route name="loggedIn" handler={LoggedIn}>
				<DefaultRoute name="loggedIn-index" handler={Admin_Home}/>
				<Route name="admin_home" path="home" handler={Admin_Home}/>
				<Route name="admin_authors" path="authors" handler={Admin_Author}>
					<DefaultRoute name="admin_authors-index" handler={Admin_Author_List}/>
					<Route name="admin_authors_list" path="list" handler={Admin_Author_List}/>
					<Route name="admin_authors_add" path="add" handler={Admin_Author_Add}/>
					<NotFoundRoute handler={Admin_Author_List}/>
				</Route>
				<Route name="admin_poems" path="poems" handler={Admin_Poem}>
					<DefaultRoute name="admin_poems-index" handler={Admin_Poem_List}/>
					<Route name="admin_poems_list" path="list" handler={Admin_Poem_List}/>
					<Route name="admin_poems_add" path="add" handler={Admin_Poem_Add}/>
					<Route name="admin_poems_edit" path="edit/:id" handler={Admin_Poem_Edit}/>
					<NotFoundRoute handler={Admin_Poem_List}/>
				</Route>
				<Route name="admin_painting" path="painting" handler={Admin_Painting}>
					<DefaultRoute name="admin_painting-index" handler={Admin_Painting_List}/>
					<Route name="admin_painting_list" path="list" handler={Admin_Painting_List}/>
					<Route name="admin_painting_add" path="add" handler={Admin_Painting_Add}/>
					<NotFoundRoute handler={Admin_Painting_List}/>
				</Route>
				<NotFoundRoute handler={Admin_Home}/>
			</Route>
			<NotFoundRoute handler={Admin_Login}/>
		</Route>
		<NotFoundRoute handler={Home}/>
	</Route>
);

Router.run(routes, function(Handler){
	if(Cookies.get('admin_user')){
		var admin_user = JSON.parse(Cookies.get('admin_user'));

		$.ajaxPrefilter(function(options) {
	        options.beforeSend = function (xhr) {
	            xhr.setRequestHeader('Authorization', 'bearer '+admin_user.token);
	        }
		});
	}
	
	React.render(<Handler/>, document.body);
});