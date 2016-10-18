import React from 'react';
import config from '../../../services/config';


var Image = React.createClass({
    propTypes: {
        src: React.PropTypes.string,
        style: React.PropTypes.object

    },

    render() {

        var _props = this.props;
        var src = _props.src
        var style = _props.style

        if (src.indexOf('http://') != 0 && src.indexOf('https://') != 0) {
            src = config.imageurl + src
        }


        return <img src={src} style={style}/>
    }

})

module.exports = Image;