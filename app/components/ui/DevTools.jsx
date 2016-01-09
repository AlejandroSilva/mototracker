import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

//export default createDevTools(
module.exports = createDevTools(
    <DockMonitor toggleVisibilityKey='H' changePositionKey='Q'>
        <LogMonitor />
    </DockMonitor>
)