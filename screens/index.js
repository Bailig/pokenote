import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';
import PropTypes from 'prop-types';

import * as appModule from '../modules/app';
import * as pokemonModule from '../modules/pokemon';
import * as againstPokemonModule from '../modules/againstPokemon';
import AgainstScreen from './AgainstScreen';
import AgainstMenuScreen from './AgainstMenuScreen';
import FindPokemonScreen from './FindPokemonScreen';
import CatchScreen from './CatchScreen';
import { elevation, COLOR, TEXT_STYLE } from './commonStyles';

const MeScreen = () => <View style={{ flex: 1 }}><Text>MeScreen</Text></View>;

class Screens extends React.Component {
  componentWillMount() {
    const { loadFont, fetchPokemon, fetchAgainstPokemon } = this.props;
    loadFont();
    fetchPokemon();
    fetchAgainstPokemon();
  }

  render() {
    const { fontLoaded } = this.props;
    if (!fontLoaded) return <AppLoading />;
    const HomeTab = createBottomTabNavigator({
      against: {
        screen: AgainstScreen,
        navigationOptions: { title: 'Against' },
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
            case 'against':
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
          const iconColor = focused ? COLOR.highContrastLight : COLOR.lowContrastLight;
          return <Icon name={iconName} type="font-awesome" color={iconColor} size={30} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: COLOR.highContrastLight,
        inactiveTintColor: COLOR.lowContrastLight,
        activeBackgroundColor: COLOR.lowContrastDark,
        inactiveBackgroundColor: COLOR.lowContrastDark,
        style: [{ height: 56 }, elevation(8)],
        labelStyle: TEXT_STYLE.subtitle2,
      },
    });

    const AppNavigator = createStackNavigator({
      home: HomeTab,
      findPokemon: FindPokemonScreen,
      againstMenu: AgainstMenuScreen,
    }, {
      navigationOptions: {
        header: null,
      },
      mode: 'modal',
      cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
      },
      transitionConfig: () => ({
        containerStyle: {
          backgroundColor: 'transparent',
        },
      }),
    });

    return <AppNavigator />;
  }
}


Screens.propTypes = {
  fontLoaded: PropTypes.bool.isRequired,
  loadFont: PropTypes.func.isRequired,
  fetchPokemon: PropTypes.func.isRequired,
  fetchAgainstPokemon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { app: { fontLoaded } } = state;
  return { fontLoaded };
};

const mapDispatchToProps = {
  loadFont: appModule.loadFont,
  fetchPokemon: pokemonModule.fetchPokemon,
  fetchAgainstPokemon: againstPokemonModule.fetchAgainstPokemon,
};

export default connect(mapStateToProps, mapDispatchToProps)(Screens);
