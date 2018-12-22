import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme({
    palette: {
        textColor: '#333',
    },
    checkbox: {
        boxColor: '#ccc',
        checkedColor: '#3986FF',
    },
    radioButton: {
        borderColor: '#ccc',
        checkedColor: '#3986FF',
    },
    textField: {
        focusColor: '#3986FF',
    },
});

export default theme;