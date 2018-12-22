const styles = {
    topbarIcon: {width:'28px',height:'28px',background:'#efefef'},

    menu:{
        menuRoot: {
            fontSize: '12px',
        },
        menuItem: {
            top: '50%',
            marginTop: '-8px',
        },
        selectStyle: {
            backgroundColor: '#ececec',
        },
        innerDiv: {
            padding: '12px 0 12px 40px',
        },
        iconMenusList: {
            fontSize: '12px',
            height: '32px',
            lineHeight: '32px',
            minHeight: 'auto',
        },
    },

    list:{
        optionBtn: {
            border: 'none',
        },
        optionMenuItem: {
            fontSize: '12px',
            width: '100px',
        }
    },

    form:{
        input: {

        },
        select: {
            width: '100%',
        },
    },

    deleteDialog: {
        title: {
            fontSize: '14px',
        },
        content: {
            fontSize: '12px',
        },
    },
    button: {
        cancel: {
            color: '#EC5858',
        },
        confirm: {
            color: 'rgb(57, 134, 255)',
        },
        confirmDelete: {
            color: '#666',
        },
        createButton: {
            width:'auto',
            height:36,
            color:'#fff',
            fontSize:'14px',
            marginRight:'20px',
            backgroundColor:'#448AFF',
            boxShadow:'0px 1px 2px 0px rgba(74,74,74,0.4)',
            borderRadius:'2px',
        },
        createButtonLabel: {
            fontWeight: 'normal',
        },

        radioButton: {
            root: {
                marginRight:'8px',
            },
            iconStyle: {
                width:'16px',
                height:'16px',
                marginRight:'0px',
            },
            labelStyle: {
                width:'auto',
                fontSize:'14px',
                paddingLeft:'5px',
            },
        },

        dialogClose: {
            position: 'absolute',
            right: '3px',
            top: '3px',
            padding: 0,
            width: '24px',
            height: '24px',

        },
    },
    optionMenu: {
        iconRoot: {
            position: 'absolute',
            top: '-18px',
            right: '0',
        },
        icon: {
            fontSize: '14px',
        },
        menu: {
            position: 'fixed',
            transition: 'all 0s',
            WebkitTransition: 'all 0s',
            MozTransition: 'all 0s',
            OTransition: 'all 0s',
            left: '0px',
            top: '-1000px',
        },
        iconMenuStyle: {
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#808080',
        },
    },
    selectField: {
        hintStyle: {
            fontSize: '12px',
            color: '#999',
        },
        selectedLabel: {
            fontSize: '14px',
        },
    },
};

export default styles;