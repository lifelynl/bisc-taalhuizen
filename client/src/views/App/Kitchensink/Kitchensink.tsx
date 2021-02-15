import React from 'react'
import classNames from 'classnames'

import styles from './Kitchensink.module.scss'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import PageTitle from '../../../components/Core/Text/PageTitle'
import SectionTitle from '../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Space from '../../../components/Core/Layout/Space/Space'
import LayoutItem from '../../../components/Core/Layout/LayoutItem/LayoutItem'
import { IconType } from '../../../components/Core/Icon/IconType'
import Icon from '../../../components/Core/Icon/Icon'
import Spinner, { Animation } from '../../../components/Core/Feedback/Spinner/Spinner'
import Tooltip from '../../../components/Core/Feedback/Tooltip/Tooltip'
import LabelTag, { LabelColor } from '../../../components/Core/DataDisplay/LabelTag/LabelTag'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import Notification from '../../../components/Core/Feedback/Notifications/Notification'
import { NotificationType } from '../../../components/Core/Feedback/Notifications/types'
import MainNavigation from '../../../components/Core/Navigation/MainNavigation/MainNavigation'
import MainNavigationItem from '../../../components/Core/Navigation/MainNavigation/MainNavigationItem'
import { routes } from '../../../routes'
import { MainNavigationType } from '../../../components/Core/Navigation/MainNavigation/types'
import MainNavigationEnvironmentCard from '../../../components/Core/Navigation/MainNavigation/MainNavigationEnvironmentCard'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import ContentGreetingPageLayout from '../../../components/Core/PageLayout/ContentGreetingPageLayout'
import AppPageLayout from '../../../components/Core/PageLayout/AppPageLayout'

export default function Kitchensink() {
    return (
        <Column spacing={8} className={styles.container}>
            {renderColors()}
            <Space />
            <Space />
            {renderTypography()}
            <Space />
            <Space />
            {renderIcons()}
            <Space />
            <Space />
            {renderButtons()}
            <Space />
            <Space />
            {renderSpinners()}
            <Space />
            <Space />
            {renderFeedback()}
            <Space />
            <Space />
            {renderNavigation()}
            <Space />
            <Space />
            {renderPageLayout()}
        </Column>
    )

    function renderColors() {
        return (
            <>
                <PageTitle title="Colors" />
                <Column spacing={8}>
                    <Row>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.biscOrange)} />
                            <div>bisc orange</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.biscIce)} />
                            <div>bisc ice</div>
                        </Column>
                    </Row>
                    <Row>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.yellow)} />
                            <div>yellow</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.salmon)} />
                            <div>salmon</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.purple)} />
                            <div>purple</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.darkBlue)} />
                            <div>dark blue</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.polar)} />
                            <div>polar</div>
                        </Column>
                    </Row>
                    <Row>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.dark99)} />
                            <div>dark 99</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.grey80)} />
                            <div>grey 80</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.grey60)} />
                            <div>grey 60</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.grey20)} />
                            <div>grey 20</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.grey10)} />
                            <div>grey 10</div>
                        </Column>
                    </Row>
                    <Row>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.uiSuccess)} />
                            <div>ui success</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.uiWarning)} />
                            <div>ui warning</div>
                        </Column>
                        <Column spacing={2}>
                            <div className={classNames(styles.colorContainer, styles.uiDanger)} />
                            <div>ui danger</div>
                        </Column>
                    </Row>
                </Column>
            </>
        )
    }

    function renderTypography() {
        return (
            <>
                <PageTitle title="Typography" />
                <Column>
                    <PageTitle title="H1 | Page Title" />
                    <SectionTitle title="H2 | Section Title" />
                    <SectionTitle heading="H3" title="H3 |" />
                    <SectionTitle heading="H4" title="H4 |" />
                    <SectionTitle heading="H5" title="H5 |" />
                    <SectionTitle heading="H6" title="H6 |" />
                    <SectionTitle heading="H7" title="H7 | Small Title" />
                    <SectionTitle heading="H8" title="H8 | Ant Title" />
                </Column>
                <Column spacing={4}>
                    <Paragraph bold={true}>Lorem ipsum dolor sit amet</Paragraph>
                    <Row>
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                    </Row>
                    <Row>
                        <Paragraph italic={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                        <Paragraph italic={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                    </Row>
                </Column>
            </>
        )
    }

    function renderIcons() {
        return (
            <>
                <PageTitle title="Icons" />
                <Row wrap={true}>
                    {Object.entries(IconType).map(([key, type], i) => (
                        <Column key={`icon-${i}`}>
                            <Paragraph subtle={true} small={true}>
                                {key}
                            </Paragraph>
                            <Icon type={type} />
                        </Column>
                    ))}
                </Row>
            </>
        )
    }

    function renderButtons() {
        return (
            <>
                <PageTitle title="Buttons" />
                <Row>
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph small={true}> </Paragraph>
                        <Paragraph>Primary</Paragraph>
                        <Paragraph>Secondary</Paragraph>
                        <Paragraph>Tertiary</Paragraph>
                        <Paragraph>Arrow + Link</Paragraph>
                        <Paragraph>Round With Icon: primary</Paragraph>
                        <Paragraph>Round With Icon: secondary</Paragraph>
                        <Paragraph>With Icon: primary</Paragraph>
                        <Paragraph>With Icon: secondary</Paragraph>
                        <Paragraph>With Icon: tertiary</Paragraph>
                        <Paragraph>Big</Paragraph>
                    </Column>
                    {/* default */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Default
                        </Paragraph>
                        <LayoutItem>
                            <Button type={ButtonType.primary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.secondary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.tertiary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.arrowLink} icon={IconType.arrowRight} href="/">
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button type={ButtonType.primary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.secondary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.tertiary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button big={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                    {/* disabled */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Disabled
                        </Paragraph>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.tertiary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.arrowLink} icon={IconType.arrowRight} href="/">
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button big={true} disabled={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                    {/* loading */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Loading
                        </Paragraph>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.tertiary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button loading={true} round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.tertiary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button big={true} loading={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                    {/* danger */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Danger
                        </Paragraph>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button danger={true} round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} round={true} icon={IconType.arrowLeft} type={ButtonType.secondary} />
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button big={true} danger={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                </Row>
            </>
        )
    }

    function renderSpinners() {
        return (
            <>
                <PageTitle title="Spinners" />
                <Row>
                    <Spinner small={true} delayed={true} />
                    <Spinner />
                    <Spinner large={true} slow={true} />
                    <Spinner small={true} type={Animation.pageSpinner} />
                    <Spinner type={Animation.pageSpinner} />
                    <Spinner large={true} type={Animation.pageSpinner} slow={true} delayed={true} />
                </Row>
            </>
        )
    }

    function renderFeedback() {
        const title = 'Some Title'
        const message = 'Some long message. Some long message. Some long message. Some long message. Some long message.'

        return (
            <>
                <PageTitle title="Feedback" />
                <Column>
                    <Row>
                        <SectionTitle heading="H4" title="Notifications" />
                        <Button onClick={() => NotificationsManager.success('title', 'test')}>
                            success notification
                        </Button>
                        <Button
                            type={ButtonType.tertiary}
                            onClick={() => NotificationsManager.warning('title', 'test')}
                        >
                            warning notification
                        </Button>
                        <Button danger={true} onClick={() => NotificationsManager.error('title', 'test')}>
                            error notification
                        </Button>
                    </Row>
                    <Space />
                    <Notification title={title} message={message} type={NotificationType.success} />
                    <Row>
                        <SectionTitle heading="H4" title="Tooltip" />
                        <Tooltip message="some message">
                            <Paragraph className={styles.tooltipText}>hover over this</Paragraph>
                        </Tooltip>
                    </Row>
                    <Space />
                    <Row>
                        <SectionTitle heading="H4" title="Tags" />
                        <LabelTag label="admin" color={LabelColor.red} />
                        <LabelTag label="Coördinator" color={LabelColor.yellow} />
                        <LabelTag label="Medewerker" />
                        <LabelTag label="Begeleider" color={LabelColor.purple} />
                    </Row>
                </Column>
            </>
        )
    }

    function renderNavigation() {
        const renderComponent = (type: MainNavigationType) => (
            <MainNavigation
                type={type}
                TopComponent={
                    <MainNavigationEnvironmentCard name={'Applicatie naam'} environment={'BISC OMGEVING'} type={type} />
                }
                ListComponent={
                    <>
                        <MainNavigationItem label="Deelnemers" icon={IconType.taalhuis} to={routes.index} type={type} />
                        <MainNavigationItem
                            label="Aanbieders"
                            icon={IconType.providers}
                            active={true}
                            to={routes.programs}
                            type={type}
                        />
                        <MainNavigationItem label="Aanbod" icon={IconType.offer} to={routes.myPrograms} type={type} />
                        <MainNavigationItem
                            label="Rapportages"
                            icon={IconType.rapportage}
                            to={routes.addPersonToProgram}
                            type={type}
                        />
                        <MainNavigationItem
                            label="Beheer"
                            icon={IconType.settings}
                            to={routes.kitchensink}
                            type={type}
                        />
                    </>
                }
                BottomComponent={
                    <>
                        <MainNavigationItem
                            label="Daniella de Wit"
                            icon={IconType.profile}
                            to={routes.addPersonToProgram}
                            type={type}
                        />
                        <MainNavigationItem
                            label="Uitloggen"
                            icon={IconType.logOut}
                            onClick={() => alert('log me out')}
                            type={type}
                        />
                    </>
                }
            />
        )

        return (
            <>
                <PageTitle title="Navigation" />
                <div style={{ height: 900, background: 'red', display: 'flex' }}>
                    {renderComponent(MainNavigationType.aanbieder)}
                    {renderComponent(MainNavigationType.bisc)}
                    {renderComponent(MainNavigationType.taalhuis)}
                </div>
                <Actionbar
                    LeftComponent={
                        <Button type={ButtonType.secondary} icon={IconType.delete}>
                            Button text
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button type={ButtonType.secondary}>Tertiary</Button>
                            <Button>Primary</Button>
                        </Row>
                    }
                />
                <Actionbar
                    LeftComponent={
                        <Button type={ButtonType.secondary} danger={true} icon={IconType.delete}>
                            Button text
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button type={ButtonType.secondary}>Tertiary</Button>
                            <Button>Primary</Button>
                        </Row>
                    }
                />
            </>
        )
    }

    function renderPageLayout() {
        return (
            <div style={{ height: 900, width: '100%', background: 'black' }}>
                <ContentGreetingPageLayout greeting={'Welkom bij Mijn Taalhuis'} ContentComponent={<p>:)</p>} />
                <AppPageLayout
                    NavigationComponent={
                        <MainNavigation
                            type={MainNavigationType.bisc}
                            TopComponent={
                                <MainNavigationEnvironmentCard
                                    name={'Applicatie naam'}
                                    environment={'BISC OMGEVING'}
                                    type={MainNavigationType.bisc}
                                />
                            }
                            ListComponent={
                                <>
                                    <MainNavigationItem
                                        label="Deelnemers"
                                        icon={IconType.taalhuis}
                                        to={routes.index}
                                        type={MainNavigationType.bisc}
                                    />
                                    <MainNavigationItem
                                        label="Aanbieders"
                                        icon={IconType.providers}
                                        active={true}
                                        to={routes.programs}
                                        type={MainNavigationType.bisc}
                                    />
                                    <MainNavigationItem
                                        label="Aanbod"
                                        icon={IconType.offer}
                                        to={routes.myPrograms}
                                        type={MainNavigationType.bisc}
                                    />
                                    <MainNavigationItem
                                        label="Rapportages"
                                        icon={IconType.rapportage}
                                        to={routes.addPersonToProgram}
                                        type={MainNavigationType.bisc}
                                    />
                                    <MainNavigationItem
                                        label="Beheer"
                                        icon={IconType.settings}
                                        to={routes.kitchensink}
                                        type={MainNavigationType.bisc}
                                    />
                                </>
                            }
                            BottomComponent={
                                <>
                                    <MainNavigationItem
                                        label="Daniella de Wit"
                                        icon={IconType.profile}
                                        to={routes.addPersonToProgram}
                                        type={MainNavigationType.bisc}
                                    />
                                    <MainNavigationItem
                                        label="Uitloggen"
                                        icon={IconType.logOut}
                                        onClick={() => alert('log me out')}
                                        type={MainNavigationType.bisc}
                                    />
                                </>
                            }
                        />
                    }
                    ContentComponent={<p>:)</p>}
                />
            </div>
        )
    }
}
