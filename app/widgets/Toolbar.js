import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import Color from "../styles/Color";
import Dimensions from "../styles/Dimensions";
import PropTypes from 'prop-types'

const propTypes = {
    title: PropTypes.string,
    leftIconPress: PropTypes.func,
    rightIconPress: PropTypes.func,
    showable: PropTypes.bool,
    showLeftIcon: PropTypes.bool,
    showRightIcon: PropTypes.bool,
    leftIcon: PropTypes.any,
    rightIcon: PropTypes.any,
    backgroundColor: PropTypes.string
};

export default class Toolbar extends React.PureComponent<propTypes> {

    static defaultProps = {
        showable: true,
        showLeftIcon: true,
        showRightIcon: false,
    };

    _leftIconPress = () => {
        if (this.props.leftIconPress)
            this.props.leftIconPress();
    };

    _rightIconPress = () => {
        if (this.props.rightIconPress)
            this.props.rightIconPress();
    };

    _renderLeftIcon = () => {
        if (this.props.showLeftIcon) {
            return (
                <TouchableOpacity
                    onPress={this._leftIconPress}
                    style={[styles.iconBox, {position: 'absolute', left: 0}]}
                >
                    <Image style={styles.icon}
                           source={this.props.leftIcon ? this.props.leftIcon : require('../assets/images/icon_back.png')}/>
                </TouchableOpacity>
            )
        }
        return null
    };

    _renderRightIcon = () => {
        if (this.props.showRightIcon) {
            return (
                <TouchableOpacity
                    onPress={this._rightIconPress}
                    style={[styles.iconBox, {position: 'absolute', right: 0}]}
                >
                    <Image style={styles.icon}
                           source={this.props.rightIcon ? this.props.rightIcon : require('../assets/images/icon_more.png')}/>
                </TouchableOpacity>
            )
        }
        return null
    };

    render() {

        if (this.props.showable) {

            return (
                <View style={[styles.container,{backgroundColor:this.props.backgroundColor}]}>
                    <View style={styles.topBlank}/>
                    <View style={styles.content}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        {
                            this._renderLeftIcon()
                        }

                        {
                            this._renderRightIcon()
                        }

                    </View>
                </View>
            )
        } else {
            return null
        }

    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Color.purple,
    },
    topBlank: {
        width: '100%',
        height: Dimensions.topBlankHeight,
    },
    content: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconBox: {
        padding: 20
    },
    icon: {
        width: 24,
        height: 24
    },
    title: {
        fontSize: 24,
        color: Color.white,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        flex: 1
    }
});