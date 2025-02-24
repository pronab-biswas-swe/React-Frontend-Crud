import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import { ReactNode } from 'react';

type DrawerHeaderProps = {
	title: string | ReactNode;
	closeIconAction?: () => void;
	backIconAction?: () => void;
};

const DrawerHeader = ({ title, closeIconAction, backIconAction }: DrawerHeaderProps) => {
	return (
		<div className='border-bottom position-sticky sticky-top d-flex align-items-center justify-content-between px-5 py-3 bg-white'>
			<div className='d-flex align-items-center gap-2'>
				{backIconAction ? (
					<Icon
						icon='arrow_back'
            size={20}
						onClick={backIconAction}
					/>
				) : null}
				<h3 className='mb-0'>{title}</h3>
			</div>
			{closeIconAction ? (
				<IconButton
					iconName='close'
          iconColor='danger'
          iconSize={20}
					onClick={closeIconAction}
				/>
			) : null}
		</div>
	);
};

export default DrawerHeader;
