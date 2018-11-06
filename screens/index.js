import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';
import PropTypes from 'prop-types';

import * as appModule from '../modules/app';
import * as pokemonModule from '../modules/pokemon';
import AgainstScreen from './AgainstScreen';
import FindPokemonScreen from './FindPokemonScreen';
import CatchScreen from './CatchScreen';
import {
  LOW_CONTRAST_LIGHT, HIGH_CONTRAST_LIGHT, LOW_CONTRAST_DARK, elevation, SUBTITLE2,
} from './commonStyles';

const MeScreen = () => <View style={{ flex: 1 }}><Text>MeScreen</Text></View>;

class Screens extends React.Component {
  componentWillMount() {
    const { loadFont, loadPokemon } = this.props;
    loadFont();
    loadPokemon();
  }

  render() {
    const { fontLoaded } = this.props;
    if (!fontLoaded) return <AppLoading />;

    const AgainstFlow = createStackNavigator({
      against: {
        screen: AgainstScreen,
        navigationOptions: { header: null },
      },
      findPokemon: {
        screen: FindPokemonScreen,
        navigationOptions: { header: null },
      },
    }, {
      mode: 'modal',
    });

    const AppNavigator = createBottomTabNavigator({
      againstFlow: {
        screen: AgainstFlow,
        navigationOptions: ({ navigation }) => {
          const { routes } = navigation.state;
          return { title: 'Against', tabBarVisible: routes.length <= 1 };
        },
      },
      catch: {
        screen: CatchScreen,
        navigationOptions: { title: 'Catch' },
      },
      me: {
        screen: MeScreen,
        navigationOptions: { title: 'Me' },
      },
    }, {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;
          let iconName;
          switch (routeName) {
            case 'againstFlow':
              iconName = 'hand-rock-o';
              break;
            case 'catch':
              iconName = 'heart-o';
              break;
            case 'me':
              iconName = 'user-o';
              break;
            default:
              break;
          }
          const iconColor = focused ? HIGH_CONTRAST_LIGHT : LOW_CONTRAST_LIGHT;
          return <Icon name={iconName} type="font-awesome" color={iconColor} size={30} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: HIGH_CONTRAST_LIGHT,
        inactiveTintColor: LOW_CONTRAST_LIGHT,
        activeBackgroundColor: LOW_CONTRAST_DARK,
        inactiveBackgroundColor: LOW_CONTRAST_DARK,
        style: [{ height: 56 }, elevation(8)],
        labelStyle: SUBTITLE2,
      },
    });
    return <AppNavigator />;
  }
}


Screens.propTypes = {
  fontLoaded: PropTypes.bool.isRequired,
  loadFont: PropTypes.func.isRequired,
  loadPokemon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { app: { fontLoaded } } = state;
  return { fontLoaded };
};

export default connect(mapStateToProps, { ...appModule, ...pokemonModule })(Screens);
