import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { ContactMomentsDetailContainer } from '../../ContactMomentsDetailContainer/ContactMomentsDetailContainer'
import styles from './ContactMomentsSuccessView.module.scss'

interface Props {
    message: string
}

export const ContactMomentsSuccesView: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.mainContainer}>
            <ContactMomentsDetailContainer type={'success'}>
                <div className={styles.contentContainer}>
                    <div className={styles.iconContainer}>
                        <Icon type={IconType.checkmark} className={styles.icon} />
                    </div>
                    <SectionTitle title={props.message} heading={'H4'} className={styles.title} />
                </div>
            </ContactMomentsDetailContainer>
        </div>
    )
}
