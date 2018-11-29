import { Icon } from 'antd';
const iconUrl = require('../../../config/config.json');

export const IconFont = Icon.createFromIconfontCN({
    scriptUrl: iconUrl.iconScriptUrl,
});
