import React, { Component } from 'react';
import {
  Dimensions,
  Navigator,
} from 'react-native';
import {
  Drawer,
  Text,
} from 'native-base';
// import Drawer from 'react-native-drawer';

import DrawerContent from './drawer-content';
import Numbers from './scenes/numbers/index';
import Money from './scenes/money/index';
import About from './scenes/about/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    let { width, height } = Dimensions.get('window');
    this.state = {
      layout: {
        width: width,
        height: height,
      },
    };
  }
  render() {
    return (
      <Drawer
        ref={ref => this._drawer = ref}
        content={<DrawerContent navigate={this.navigate} closeDrawer={this.closeDrawer}/>}
        type='overlay'
        openDrawerOffset={0.45}
        tapToClose={true} // close drawer on click ouside the drawer
        tweenHandler={this.tweenHandler}
        tweenDuration={500}
        tweenEasing={'easeInOutQuart'}
        side='left'
      >
        <Navigator
          ref={ref => this._navigator = ref}
          onLayout={this.onLayout}
          initialRoute={{scene: 'numbers'}}
          renderScene={this.renderScene}
          configureScene={this.configureScene} />
      </Drawer>
    )
  }
  navigate = route => {
    this._navigator.replace(route);
    this._drawer.close();
  };
  renderScene = (route, navigator) => {
    let SceneComponent = null;
    switch (route.scene) {
      case 'about':
        SceneComponent = About;
        break;
      case 'numbers':
        SceneComponent = Numbers;
        break;
      case 'money':
        SceneComponent = Money;
        break;
    }
    return (
      <SceneComponent
        direction={'ltr'}
        openDrawer={this.openDrawer}
        route={route}
        layout={this.state.layout}
        navigator={navigator} />
    );
  };
  configureScene = (route, routeStack) => {
    return {
      ...Navigator.SceneConfigs.VerticalDownSwipeJump,
      gestures: {}
    };
    let sceneConfig = 'VerticalDownSwipeJump';
    sceneConfig = 'HorizontalSwipeJump';
    if (route.sceneConfig) {
      sceneConfig = route.sceneConfig;
    }
    if (route.scene==='newCard'){
      sceneConfig='HorizontalSwipeJump';
    }
    return {
      ...Navigator.SceneConfigs[sceneConfig],
      gestures: {}
    };
  };
  setNavigatorRef = (navigator) => {
    if (navigator !== this._navigator) {
      this._navigator = navigator;

      if (navigator) {
        var callback = (event) => {
          console.log(
            `NavigatorMenu: event ${event.type}`,
            {
              route: JSON.stringify(event.data.route),
              target: event.target,
              type: event.type,
            }
          );
        };
        // Observe focus change events from the owner.
        this._listeners = [
          navigator.navigationContext.addListener('willfocus', callback),
          navigator.navigationContext.addListener('didfocus', callback),
        ];
      }
    }
  };
  onLayout = (event) => {
    console.log('------------' + JSON.stringify(event.nativeEvent.layout));
    if (this.state.layout.width !== event.nativeEvent.layout.width){
      this.setState({
        layout:event.nativeEvent.layout,
      });
    }
  };
  openDrawer = () => this._drawer.open();
  closeDrawer = () => this._drawer.close();
  tweenHandler = ratio => {
    return {
      main: {
        opacity:(2-ratio)/2,
      },
      drawer: {
        shadowColor: '#0f0',
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
    };
    var r0 = -ratio/6
    var r1 = 1-ratio/6
    var t = [
      r1,  r0,  0,  0,
      -r0, r1,  0,  0,
      0,   0,   1,  0,
      0,   0,   0,  1,
    ]
    return {
      main: {
        style: {
          transformMatrix: t,
          opacity: 1 - ratio/2,
        },
      },
    };
  };
}
