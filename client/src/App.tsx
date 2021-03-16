import React from 'react'
import RootView from './views/RootView'
import { NotificationsManager } from './components/Core/Feedback/Notifications/NotificationsManager'
import { default as ReactModal } from 'react-modal'
ReactModal.setAppElement('#root')

function App() {
    return (
        <>
            <RootView />
            <NotificationsManager />
        </>
    )
}

export default App
