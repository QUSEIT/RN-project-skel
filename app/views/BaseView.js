import React from 'react'
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native'
import Color from "../styles/Color";
import Toolbar from "../widgets/Toolbar";
import PropsType from 'prop-types'

const propTypes = {
    back: PropsType.func,
    rightPress: PropsType.func
};

export default class BaseView extends React.PureComponent<propTypes> {

    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }

    renderContent() {
        return null
    }

    _back = () => {
        if (this.props.back)
            this.props.back()
    };

    _rightPress = () => {
        if (this.props.rightPress)
            this.props.rightPress()
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Color.purple}
                    translucent={false}
                    hidden={false}
                    barStyle={'light-content'}
                />
                <Toolbar
                    leftIconPress={this._back}
                    rightIconPress={this._rightPress}
                    title={this.props.title}
                    showLeftIcon={this.props.showLeftIcon}
                    showRightIcon={this.props.showRightIcon}
                    showable={this.props.toolbarShowable}
                    leftIcon={this.props.leftIcon}
                    rightIcon={this.props.rightIcon}
                    backgroundColor={Color.purple}
                />
                {
                    this.renderContent()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg
    }
});