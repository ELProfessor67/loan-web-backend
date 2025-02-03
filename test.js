import Imap from 'imap';
import { simpleParser } from 'mailparser';

const imap = new Imap({
    user: 'wi223488@gmail.com',
    password: 'plyzrdrnshkhscax',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false,
    }
});

const openInbox = (cb) => {
    imap.openBox('INBOX', true, cb);
};

imap.once('ready', () => {
    openInbox((err, box) => {
      if (err) throw err;
  
      imap.on('mail', () => {
        const fetch = imap.seq.fetch(`${box.messages.total}:*`, {
          bodies: '',
          markSeen: true,
        });
  
        fetch.on('message', (msg) => {
          msg.on('body', async (stream) => {
            const parsed = await simpleParser(stream);
            console.log('New Email Subject:', parsed.subject);
            console.log('From:', parsed.from.text);
            console.log('Body:', parsed.text);
  
            // Extracting headers
            if (parsed.headers.has('message-id')) {
              console.log('Message-ID:', parsed.headers.get('message-id'));
            }
  
            if (parsed.headers.has('in-reply-to')) {
              console.log('In-Reply-To:', parsed.headers.get('in-reply-to'));
            }
          });
        });
  
        fetch.on('error', (err) => {
          console.error('Fetch Error:', err);
        });
      });
    });
  });

imap.once('error', (err) => {
    console.error(err);
});

imap.once('end', () => {
    console.log('Connection ended');
});

imap.connect();
