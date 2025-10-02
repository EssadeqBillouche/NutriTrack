import session from 'express-session';
import FileStore from 'session-file-store';
import dotenv from 'dotenv';

dotenv.config();

const FileStoreInstance = FileStore(session);

const sessionConfig = session({
  store: new FileStoreInstance({ path: './sessions' }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
});

export default sessionConfig;