import React, { useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
  InstagramIcon,
} from "next-share";

export default function SocialShare({ url, title, handleClosePopupSend }) {
  const router = useRouter();
  const [isFormProcessing, setIsFormProcessing] = useState(false);

  return (
    <>
      <div className="send_message_pop">
        <h3>Share on Social Media</h3>
        <div className="send_blk_msg">
          <div className="head_professional">

            <FacebookShareButton
              url={url}
              quote={
                "WefitWork Professional"
              }
              hashtag={"#wefitwork"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TelegramShareButton
              url={url}
              title={title}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>

            <TwitterShareButton
              url={url}
              title={title}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={url}
              title={title}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <FacebookMessengerShareButton
              url={url}
              appId={""}
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>

            <EmailShareButton
              url={url}
              subject={"WefitWork Professional"}
              body="WefitWork Professional"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
          
        </div>
      </div>
    </>
  );
}
