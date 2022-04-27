import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { MessageTypes } from 'src/store/types';

import './styles.scss';

type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
  bottom: string;
}

function Message({ message }: Props) {
  
  const sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(message.text);

    console.log(message)
  return (
    <div className={`rcw-${message.sender}`}>
      <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/,'') }} />
      {<span className="rcw-timestamp">{message.footer} </span>}
    </div>
  );
}

export default Message;
