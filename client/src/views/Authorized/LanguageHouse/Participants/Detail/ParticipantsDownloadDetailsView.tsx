// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import Button, { ButtonType } from 'components/Core/Button/Button'
// import { HighlightContainer } from 'components/Core/Containers/HighlightContainer'
// import { InfoBlock } from 'components/Core/Containers/InfoBlock'
// import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
// import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
// import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
// import Field from 'components/Core/Field/Field'
// import Section from 'components/Core/Field/Section'
// import Form from 'components/Core/Form/Form'
// import { IconType } from 'components/Core/Icon/IconType'
// import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
// import Paragraph from 'components/Core/Typography/Paragraph'
import { LanguageHouseParticipantDetailTabsEnum } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/languageHouseRoutes'
// import { downloadFile } from 'utils/downloadFile'
import { ParticipantDetailHeader } from './ParticipantDetailHeader'

export const ParticipantsDownloadDetailsView: React.FunctionComponent = () => {
    // const { languageHouseParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    // const { i18n } = useLingui()
    // const { data: student, loading, error } = useGetStudent(languageHouseParticipantId)
    // const {
    //     response: reportResponse,
    //     loading: reportLoading,
    //     error: reportError,
    //     refetch,
    // } = useGetSingleStudentReport(languageHouseParticipantId)

    // useEffect(() => {
    //     if (reportError) {
    //         NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
    //     } else if (reportResponse) {
    //         NotificationsManager.success(i18n._(t`Rapportage wordt gedownload`))
    //         downloadFile(reportResponse, 'student.pdf')
    //     }
    // }, [reportError, reportResponse])

    return (
        <Column spacing={12}>
            <ParticipantDetailHeader activeTabId={LanguageHouseParticipantDetailTabsEnum.DownloadDetails} />
            {/* {renderPage()} */}
        </Column>
    )

    // function renderPage() {
    //     if (loading) {
    //         return (
    //             <Center grow={true}>
    //                 <Spinner type={SpinnerAnimation.pageSpinner} />
    //             </Center>
    //         )
    //     }
    //     if (error || !student) {
    //         return (
    //             <ErrorBlock
    //                 title={i18n._(t`Er ging iets fout`)}
    //                 message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
    //             />
    //         )
    //     }
    //     return (
    //         <Column spacing={12}>
    //             <Section title={i18n._(t`Gegevens delen`)} useFullWidthContent={true}>
    //                 <Column>
    //                     {!student.intake?.hasPermissionToShareDataWithProviders && (
    //                         <InfoBlock type="warning" grow={true}>
    //                             <Column spacing={1}>
    //                                 <Paragraph bold={true}>
    //                                     {i18n._(t`Let op! Deel deze gegevens niet buiten een Taalhuis.`)}
    //                                 </Paragraph>
    //                                 <Paragraph>
    //                                     {i18n._(
    //                                         t`Deze deelnemer heeft aangegeven geen informatie met aanbieders te willen delen.`
    //                                     )}
    //                                 </Paragraph>
    //                             </Column>
    //                         </InfoBlock>
    //                     )}
    //                     <HighlightContainer>
    //                         <Form>
    //                             <Field label={i18n._(t`Intakegegevens`)} horizontal={true}>
    //                                 <div>
    //                                     {/* div to prevent button from stretching */}
    //                                     <Button
    //                                         onClick={handleDownload}
    //                                         type={ButtonType.primary}
    //                                         icon={IconType.download}
    //                                         stretch={false}
    //                                         loading={reportLoading}
    //                                     >
    //                                         {i18n._(t`Download`)}
    //                                     </Button>
    //                                 </div>
    //                             </Field>
    //                         </Form>
    //                     </HighlightContainer>
    //                 </Column>
    //             </Section>
    //         </Column>
    //     )
    // }

    // async function handleDownload() {
    //     await refetch()
    // }
}
