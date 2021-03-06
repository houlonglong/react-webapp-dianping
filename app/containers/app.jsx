import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

//redux流
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFiles from '../actions/userinfo'

//本地缓存配置
import { CITYNAME } from '../config/localStorekey'
import LocalStore from '../util/localStore'


// 路由配置
import Home from '../containers/Home'
import City from '../containers/City'
import Search from '../containers/Search'
import CSS from '../containers/CSS'
import JS from '../containers/JS'
import User from '../containers/user'
import Detail from '../containers/Detail'
import NotFound from '../containers/404'
import Footer from '../components/Footer'


class App extends Component{
	constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
	render(){
		const history = createBrowserHistory();
		return (
			<Router>
			{
				this.state.initDone
				?	<div id="app">
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route exact path="/city" component={City}/>
							<Route path="/search/:category/:keyword?" component={Search}/>
							<Route path="/detail/:id" component={Detail}/>
							<Route path="/css" component={CSS}/>
							<Route path="/js" component={JS}/>
							<Route path="/user" component={User}/>
							<Route component={NotFound}/>
						</Switch>
						<Footer history={history}/>
					</div>
				: 	<div>正在加载...</div>
			}
			</Router>
		)
	}
	componentDidMount(){
		let cityName = LocalStore.getItem(CITYNAME)
		if(cityName == null){
			cityName = '上海'
		}

		this.props.userInfoActions.update({
			cityName:cityName
		})
		
		this.setState({
			initDone:true
		})
	}
}

function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
		userInfoActions:bindActionCreators(userInfoActionsFromOtherFiles,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)