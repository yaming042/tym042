import React from 'react';

export default class TextField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasValue: false,
            value: '',
            focus: false,
        };
    }
    componentDidMount(){
        this.setState({
            value: this.props.defaultValue ? this.props.defaultValue : '',
            focus: false,
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            value: this.state.hasValue ? this.state.value : (this.props.defaultValue ? this.props.defaultValue : ''),
        });
    }

    focus(e){
        this.setState({
            focus: true,
        });
        this.props.onFocus && this.props.onFocus(e);
    }
    blur(e){
        this.setState({
            focus: false,
        });
        this.props.onBlur && this.props.onBlur(e);
    }
    change(e){
        let v = e.target.value;
        this.setState({
            value: v,
            hasValue: true,
        });
        this.props.onChange && this.props.onChange(e);
    }

    render(){
        let type = this.props.type ? (this.props.type == 'textarea' ? 'textarea' : 'text') : 'text';
        let style = this.props.style ? this.props.style : null;
        let areaStyle = this.props.textAreaStyle ? this.props.textAreaStyle : null;
        let hrStyle = this.props.hrStyle ? this.props.hrStyle : null;
        let errorStyle = this.props.errorStyle ? this.props.errorStyle : null;

        let boxmb = errorStyle ? (errorStyle.fontSize ? errorStyle.fontSize : '16px') : '16px';
        let box_style = {
            position: 'relative',
            marginBottom: type == 'textarea' ? ((parseInt(boxmb)-4)+'px') : boxmb,
        };

        let bb = this.props.error ? '1px solid red' : (style ? (style.borderBottom ? style.borderBottom : '1px solid #ccc') : '1px solid #ccc');
        let bb_disabled = this.props.disabled ? '1px solid transparent' : bb;
        let input_style = {
            width: style ? (style.width ? style.width : '100%') : '100%',
            height: style ? (style.height ? style.height : 'auto') : 'auto',
            margin: style ? (style.margin ? style.margin : 0) : 0,
            padding: style ? (style.padding ? style.padding : 4) : 4,
            border: 'none',
            outline: 'none',
            borderBottom: bb_disabled,
            fontSize: style ? (style.fontSize ? style.fontSize : '14px') : '14px',
            color: style ? (style.color ? style.color : '#000') : '#000',
            backgroundColor:style ? (style.backgroundColor ? style.backgroundColor : 'transparent') : 'transparent',
        };

        let areabb = this.props.error ? '1px solid red' : ((this.state.focus ? (areaStyle ? (areaStyle.border ? areaStyle.border : '1px solid #000') : '1px solid #000') : '1px solid #ccc'));
        let areabb_disabled = this.props.disabled ? '1px solid #e6e6e6' : areabb;
        let area_style = {
            width: areaStyle ? (areaStyle.width ? areaStyle.width : '100%') : '100%',
            maxWidth: areaStyle ? (areaStyle.maxWidth ? areaStyle.maxWidth : '100%') : '100%',
            height: areaStyle ? (areaStyle.height ? areaStyle.height : 'auto') : 'auto',
            minHeight: areaStyle ? (areaStyle.minHeight ? areaStyle.minHeight : 'none') : 'none',
            margin: areaStyle ? (areaStyle.margin ? areaStyle.margin : 0) : 0,
            padding: areaStyle ? (areaStyle.padding ? areaStyle.padding : 4) : 4,
            border: areabb_disabled,
            fontSize: areaStyle ? (areaStyle.fontSize ? areaStyle.fontSize : '14px') : '14px',
            color: areaStyle ? (areaStyle.color ? areaStyle.color : '#000') : '#000',
            outline: 'none',
            resize: this.props.disabled ? 'none' : (areaStyle ? (areaStyle.resize ? areaStyle.resize : 'both') : 'both'),
            backgroundColor:areaStyle ? (areaStyle.backgroundColor ? areaStyle.backgroundColor : 'transparent') : 'transparent',
        };
        let middleWidth = style ? (style.width ? (style.width.indexOf('px')>=0 ? parseInt(style.width)/2+'px' : parseInt(style.width)/2+'%') : '50%' ) : '50%';
        let hr_style = {
            position: 'absolute',
            width: this.state.focus ? (style ? (style.width ? style.width : '100%') : '100%') : 0,
            height: 0,
            left: this.state.focus ? 0 : middleWidth,
            bottom: 0,
            boxSizing: 'content-box',
            borderTop: 'none rgb(224, 224, 224)',
            borderLeft: 'none rgb(224, 224, 224)',
            borderRight: 'none rgb(224, 224, 224)',
            borderBottom: hrStyle ? (hrStyle.border ? hrStyle.border : '1px solid #3986FF') : '1px solid #3986FF',
            transition: 'all .25s',
            opacity: this.state.focus ? 1 : 0,
        };

        let errorb = type == 'textarea' ? ((parseInt(boxmb)-4)*(-1)) : parseInt(boxmb)*(-1);
        let error_style = {
            position: 'absolute',
            fontSize: errorStyle ? (errorStyle.fontSize ? errorStyle.fontSize : '12px') : '12px',
            color: errorStyle ? (errorStyle.color ? errorStyle.color : 'red') : 'red',
            bottom: errorStyle ? (errorStyle.bottom ? errorStyle.bottom : (errorb+'px')) : (errorb+'px'),
            left: errorStyle ? (errorStyle.left ? errorStyle.left : '4px') : '4px',
        };

        return (
            <div className={`custom_input ${this.props.className || ''}`} style={box_style}>
                {
                    type != 'textarea' ?
                        (
                            this.props.disabled ?
                                <div style={input_style}>
                                    {this.state.value}
                                </div>
                                :
                                <input
                                    name={this.props.id || ''}
                                    id={this.props.id || ''}
                                    ref={this.props.id || ''}
                                    type={type}
                                    placeholder={this.props.placeholder || ''}
                                    style={input_style}
                                    value={this.state.value}
                                    onFocus={this.focus.bind(this)}
                                    onBlur={this.blur.bind(this)}
                                    onChange={this.change.bind(this)}
                                />
                        )

                        :
                        this.props.disabled ?
                            <div style={area_style}>
                                {this.state.value}
                            </div>
                            :
                            <textarea
                                name={this.props.id || ''}
                                id={this.props.id || ''}
                                ref={this.props.id || ''}
                                placeholder={this.props.placeholder || ''}
                                style={area_style}
                                value={this.state.value}
                                onFocus={this.focus.bind(this)}
                                onBlur={this.blur.bind(this)}
                                onChange={this.change.bind(this)}
                            >
                                </textarea>

                }
                {
                    type == 'text' && !this.props.disabled ?
                        <hr style={hr_style} />
                        :
                        null
                }
                {
                    this.props.error && !this.props.disabled ?
                        <p style={error_style}>{this.props.error}</p>
                        :
                        null
                }
            </div>
        );
    }
}
