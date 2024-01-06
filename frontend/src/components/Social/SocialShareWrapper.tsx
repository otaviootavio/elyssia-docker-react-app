import { Flex } from '@chakra-ui/react';
import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from 'react-share';


const SocialShareWrapper = () => {
    const url: string = window.location.href
    const title: string = "Checkout my pizza room!";

    return (
        <Flex direction="row" gap="2">
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>
        </Flex>
    );
};

export default SocialShareWrapper;
